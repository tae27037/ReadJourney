# 📚 ReadJourney

ReadJourney is a responsive web application for readers: discover recommended books, build your personal library, track your reading progress and review your reading statistics.


---

## ✨ Features

### Unauthorized user

| Page     | Route       | Description                                                             |
| -------- | ----------- | ----------------------------------------------------------------------- |
| Register | `/register` | Registration form (Name, Email, Password) with a link to the Login page |
| Login    | `/login`    | Login form (Email, Password) with a link to the Register page           |

**Form validation** is implemented with `react-hook-form` + `Yup`:

- **Name** — string
- **Email** — string, pattern `/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/`
- **Password** — string, minimum 7 characters

Behavior:

- If any value is invalid, the error reason is shown to the user and no data is sent to the backend.
- If all values are valid, the data is sent to the backend.
- Backend errors are handled and displayed as a pop-up notification.
- On success (token received), the user is automatically authorized and redirected to the private page `/recommended`.

### Authorized user

#### Main layout `/`

Contains a **Header** displayed on all pages of the authorized user:

- Company **Logo**
- **UserNav** — navigation links:
  - `/recommended` → Recommended page
  - `/library` → My library page
- **UserBar** — information about the current user

#### Recommended page `/recommended`

- **Dashboard** with:
  - **Filters** — a form with 2 inputs and a submit button ("To apply") to find books among the recommended ones
  - A block with a short description of the app's functionality and a link to the **My library** page
  - A block with a quote (static data)
- **RecommendedBooks**:
  - Page title
  - **Server-side pagination** — page number and items-per-page are sent as request parameters. Pagination always has "back" and "forward" arrows: "back" is disabled on the first page, "forward" is disabled on the last page.
  - List of recommended books rendered as cards (cover, title, author). Clicking on a cover opens a modal with detailed book info and an **"Add to library"** button.
  - The modal closes on backdrop click, on the close (cross) button, or on the `ESC` key.

#### My Library page `/library`

- **Dashboard** with:
  - **AddBook** — a form with 3 inputs and a submit button ("Add book"). All fields are validated. On click, a request is sent to the backend to add the book to the user's library. Backend errors are shown as a pop-up notification; on success, a modal with a success message is opened.
  - A block with a list of recommended books and a link to the **Recommended** page
- **MyLibraryBooks**:
  - Page title
  - A **select** to filter library books by reading status
  - List of the user's books rendered as cards (cover, title, author, and a button to remove the book from the library). Clicking on a cover opens a modal with detailed info and a **"Start reading"** button (navigates to the Reading page).
  - The modal closes on backdrop click, on the close (cross) button, or on the `ESC` key.

#### Reading page `/reading`

- **Dashboard** with:
  - **AddReading** — a form with 1 input and a submit button: **"To start"** or **"To stop"** depending on the reading phase. All fields are validated.
    - _To start_ — sends the page number the user starts reading from. On success, the **MyBook** block shows a "reading in progress" status indicator.
    - _To stop_ — sends the page number the user stopped at. On success, the reading-speed data calculated on the server is analyzed in the **Details** block. If the book is finished (the stop page equals the total number of pages), a modal with a success message is shown.
    - Backend errors are shown as a pop-up notification.
  - **Details** — detailed information about the user's reading, shown either as a **Diary** or as **Statistics**:
    - **Diary** — reading events tracked by date: pages read, reading time, percentage of pages read relative to the total, and a button to delete that reading event.
    - **Statistics** — a chart to track the progress of reading the book.
- **MyBook** — information about the currently selected book and the reading status indicator.

---

## 📱 Responsive Design

The layout is adaptive (except the mobile layout, which is fluid/adaptive as noted):

| Device  | Width                                         |
| ------- | --------------------------------------------- |
| Mobile  | from `320px` (fluid); from `375px` (adaptive) |
| Tablet  | from `768px`                                  |
| Desktop | from `1440px`                                 |

---

## ✅ Technical Requirements

- HTML5 semantics according to the standards
- Fonts connected
- Vector and raster graphics sizes optimized
- Retina-screen support for images
- Optimized image loading
- All icons connected via an SVG **sprite**
- Page **favicons** added

---

## 🛠 Tech Stack

- **React**
- **react-hook-form** + **Yup** — form handling and validation

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build
```

---


