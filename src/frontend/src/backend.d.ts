import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
}
export interface Story {
    id: StoryId;
    title: string;
    pdfBlob: ExternalBlob;
    authorName: string;
    description: string;
    language: Language;
    category: Category;
    uploadDate: Time;
}
export type StoryId = bigint;
export interface UserProfile {
    name: string;
}
export enum Category {
    historical = "historical",
    islamic = "islamic"
}
export enum Language {
    urdu = "urdu"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStory(title: string, category: Category, language: Language, pdfBlob: ExternalBlob, description: string, authorName: string): Promise<StoryId>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllStories(): Promise<Array<Story>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRecipientEmail(): Promise<string>;
    getStoriesByCategory(category: Category): Promise<Array<Story>>;
    getStoryById(id: StoryId): Promise<Story>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
}
