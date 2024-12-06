-----------------Tạo bảng-----------------
CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    GoogleID VARCHAR(100),
    ProfileImageURL VARCHAR(255),
    UserCreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Posts (
    PostID SERIAL PRIMARY KEY,
    AuthorID INT REFERENCES Users(UserID),
    Title VARCHAR(200) NOT NULL,
    Content TEXT NOT NULL,
    BannerImageURL VARCHAR(255),
    PostCreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Tags (
    TagID SERIAL PRIMARY KEY,
    TagName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE TagsOfPost (
    PostID INT REFERENCES Posts(PostID),
    TagID INT REFERENCES Tags(TagID),
    PRIMARY KEY (PostID, TagID)
);

-----------------Thêm giá trị cho Tags-----------------

INSERT INTO Tags(TagName)
VALUES 
	('Art'),
	('Technology'),
	('Programing&Coding'),
	('Design'),
	('Book'),
	('Anime&Manga'),
	('SelfDevelopment'),
	('Travel')