# Specification

## Summary
**Goal:** Add a PDF story library with Islamic and Historical categories, admin upload functionality, and read-only viewing for visitors.

**Planned changes:**
- Create backend data model for PDF stories with fields for title, category (Islamic/Historical), language (Urdu), PDF URL, description, upload date, and author name
- Add backend methods to create, retrieve, and filter stories by category
- Create admin upload page at /admin/upload-story with form for title, category, description, author, and PDF file
- Create Stories Library page at /stories with category tabs displaying story cards with title, author, description, and Read button
- Create PDF reader page at /stories/:id with embedded read-only viewer (no download)
- Add 'Stories' link to main navigation menu
- Update contact form backend to use muhammadnouman88555@gmail.com as recipient email

**User-visible outcome:** Visitors can browse Islamic and Historical stories by category and read them online without downloading. Admin can upload new PDF stories through a dedicated upload form.
