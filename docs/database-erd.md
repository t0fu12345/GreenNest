# GreenNest database diagram

GreenNest stores application data in MongoDB. This ERD shows the seven Mongoose collections and the two subdocument types defined in `backend/src/modules`. Lines between collections represent Mongoose `ObjectId` references, not database-enforced foreign keys. `GardenItem` and `CareTask` are embedded inside `User` documents and are not separate collections.

```mermaid
erDiagram
    User {
        ObjectId _id PK
        string fullName
        string email UK
        string password
        string role
        string avatarUrl
        ObjectId savedPlants "array, ref Plant"
        GardenItem garden "embedded array"
        date createdAt
        date updatedAt
    }

    GardenItem {
        ObjectId _id PK
        ObjectId plant "required, ref Plant"
        string customNickname
        date addedAt
        CareTask checklist "embedded array"
    }

    CareTask {
        ObjectId _id PK
        string taskName
        boolean completed
        date lastCompletedAt
    }

    Plant {
        ObjectId _id PK
        string specimenId UK
        string catalogCode
        string name
        string scientificName
        string slug
        string category
        string biome
        string light
        string watering
        string careLevel
        string status
        ObjectId gardener "optional, ref Gardener"
        object toxicity "embedded"
        object telemetry "embedded"
        object images "embedded"
        date createdAt
        date updatedAt
    }

    Gardener {
        ObjectId _id PK
        string name
        string specialization
        number experienceYears
        string contactEmail
        ObjectId associatedPlants "array, ref Plant"
        date createdAt
        date updatedAt
    }

    Collection {
        ObjectId _id PK
        string title
        string slug
        string description
        string coverImage
        string season
        boolean isFeatured
        ObjectId plants "array, ref Plant"
        date createdAt
        date updatedAt
    }

    PersonalCollection {
        ObjectId _id PK
        ObjectId owner "required, ref User"
        string name
        string description
        ObjectId plants "array, ref Plant"
        date createdAt
        date updatedAt
    }

    Gallery {
        ObjectId _id PK
        string imageUrl
        string alt
        string caption
        string credit
        string aspectRatio
        ObjectId plant "optional, ref Plant"
        number likesCount
        ObjectId likedBy "array, ref User"
        date createdAt
        date updatedAt
    }

    ContactMessage {
        ObjectId _id PK
        string fullName
        string email
        string subject
        string message
        string status
        date createdAt
        date updatedAt
    }

    User ||--o{ GardenItem : embeds
    GardenItem ||--o{ CareTask : embeds
    Plant ||--o{ GardenItem : appears_in
    User }o--o{ Plant : saves
    User ||--o{ PersonalCollection : owns
    PersonalCollection }o--o{ Plant : contains
    Collection }o--o{ Plant : contains
    Gardener |o--o{ Plant : assigned_to
    Gardener }o--o{ Plant : associatedPlants
    Plant |o--o{ Gallery : pictured_in
    User }o--o{ Gallery : likes
```

## Reading the diagram

- `User.garden` embeds garden entries; each entry must reference one `Plant` and embeds its care checklist.
- `User.savedPlants`, `Collection.plants`, `PersonalCollection.plants`, `Gallery.likedBy`, and `Gardener.associatedPlants` are arrays of references.
- `Plant.gardener` and `Gardener.associatedPlants` are separate references in opposite directions. The schema alone does not guarantee they remain synchronized.
- `Gallery.plant` is optional. `ContactMessage` has no model reference to `User`; its `email` is plain text.
- Additional scalar and nested `Plant` fields, including descriptions, origin, care details, traits, tags, and image URLs, are omitted from the diagram for readability. See `backend/src/modules/plant/plant.model.js` for the full schema.
