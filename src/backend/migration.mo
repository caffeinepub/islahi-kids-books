import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type Book = {
    id : Nat;
    title : Text;
    author : Text;
    ageRecommendation : Text;
    description : Text;
    coverImage : Text;
    authorBio : Text;
    educationalThemes : [Text];
    samplePages : [Text];
  };

  type OldActor = {
    books : Map.Map<Nat, Book>;
  };

  type NewActor = {};

  public func run(old : OldActor) : NewActor {
    {};
  };
};
