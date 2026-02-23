import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Migration "migration";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";

// Apply migration (empty in this case)
(with migration = Migration.run)
actor {
  include MixinStorage();

  // Initialize the access control system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Type
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Story Types
  type StoryId = Nat;

  type Category = {
    #islamic;
    #historical;
  };

  type Language = {
    #urdu;
  };

  type Story = {
    id : StoryId;
    title : Text;
    category : Category;
    language : Language;
    pdfBlob : Storage.ExternalBlob;
    description : Text;
    uploadDate : Time.Time;
    authorName : Text;
  };

  type ContactSubmission = {
    name : Text;
    email : Text;
    message : Text;
  };

  module Story {
    public func compare(story1 : Story, story2 : Story) : Order.Order {
      Text.compare(story1.title, story2.title);
    };
  };

  var nextStoryId = 0;
  var nextSubmissionId = 0;

  let stories = Map.empty<StoryId, Story>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();

  let recipientEmail = "muhammadnouman88555@gmail.com";

  // Admin-only: Add a new story (with PDF blob handling)
  public shared ({ caller }) func addStory(
    title : Text,
    category : Category,
    language : Language,
    pdfBlob : Storage.ExternalBlob,
    description : Text,
    authorName : Text,
  ) : async StoryId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add stories");
    };

    let story : Story = {
      id = nextStoryId;
      title;
      category;
      language;
      pdfBlob;
      description;
      uploadDate = Time.now();
      authorName;
    };
    stories.add(nextStoryId, story);
    let currentStoryId = nextStoryId;
    nextStoryId += 1;
    currentStoryId;
  };

  // Public: Get a story by ID
  public query ({ caller }) func getStoryById(id : StoryId) : async Story {
    switch (stories.get(id)) {
      case (null) {
        Runtime.trap("Story not found");
      };
      case (?story) { story };
    };
  };

  // Public: Get all stories
  public query ({ caller }) func getAllStories() : async [Story] {
    stories.values().toArray().sort();
  };

  // Public: Get stories filtered by category
  public query ({ caller }) func getStoriesByCategory(category : Category) : async [Story] {
    let filtered = stories.filter(
      func(_id, story) {
        story.category == category;
      }
    );

    filtered.values().toArray().sort();
  };

  // Public: Submit a contact form
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
    };
    contactSubmissions.add(nextSubmissionId, submission);
    nextSubmissionId += 1;
  };

  // Public: Get recipient email for contact form
  public query ({ caller }) func getRecipientEmail() : async Text {
    recipientEmail;
  };

  // Admin-only: Get all contact form submissions
  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray();
  };
};
