# 200 College Viva Questions and Answers Based on Quiz App

## Easy Questions (1–70)

### 1. What is the main purpose of this quiz app?
**Answer:** The main purpose is to allow users to take quizzes on various subjects and chapters, track their scores, and for admins to manage quizzes, questions, and users.

### 2. Which frontend framework is used in this app?
**Answer:** React with TypeScript is used for the frontend.

### 3. What backend technology powers the server?
**Answer:** Node.js with Express and TypeScript.

### 4. How does the app handle user authentication?
**Answer:** Through JWT tokens stored in localStorage and sent in the Authorization header.

### 5. What is the role of the `api.ts` file?
**Answer:** It defines TypeScript interfaces and functions for making API requests to the backend.

### 6. How are quizzes organized in the app?
**Answer:** Quizzes are grouped under chapters, which are grouped under subjects.

### 7. What is the function of the `QuizList.tsx` component?
**Answer:** It displays available quizzes to users, filtered by subject and chapter.

### 8. How can an admin add a new quiz?
**Answer:** Through the Manage Quizzes page in the admin panel.

### 9. What is the use of the `ManageQuizzes.tsx` component?
**Answer:** It allows admins to create, edit, and delete quizzes.

### 10. How are quiz questions managed?
**Answer:** Through the Manage Questions page, where admins can add, edit, or delete questions for each quiz.

### 11. What database is used in the backend?
**Answer:** SQLite is used as the database.

### 12. How are quiz results displayed to users?
**Answer:** Through the QuizResults component, which fetches and shows the user's score and quiz details.

### 13. What is the structure of a `Quiz` object?
**Answer:** It includes fields like id, chapter_id, title, description, timeLimit, passingScore, and more.

### 14. How does the app ensure only authenticated users can take quizzes?
**Answer:** By checking for a valid JWT token before allowing access to quiz routes.

### 15. What is the purpose of the `Navigation` component?
**Answer:** It provides navigation links for users to move between different pages.

### 16. How are quiz answers submitted?
**Answer:** Answers are sent to the backend via the `submitQuiz` API function.

### 17. What is the use of the `Score` interface?
**Answer:** It represents a user's quiz attempt, including score, time taken, and related quiz/user info.

### 18. How does the app handle time limits for quizzes?
**Answer:** The quiz timer is set based on the quiz's timeLimit or time_duration property.

### 19. What is the role of the `Option` interface?
**Answer:** It represents possible answers for a quiz question.

### 20. How are chapters fetched for a subject?
**Answer:** Using the `getChaptersBySubject` API function.

### 21. How does the app display loading states?
**Answer:** By showing a Spinner component while data is being fetched.

### 22. What is the use of the `AdminNavbar` component?
**Answer:** It provides navigation for admin users to manage different resources.

### 23. How are quiz attempts tracked?
**Answer:** Each attempt is stored as a Score record in the database.

### 24. How does the app prevent duplicate quiz submissions?
**Answer:** By disabling the submit button after submission and checking on the backend.

### 25. What is the function of the `getAllSubjects` API?
**Answer:** It fetches all available subjects from the backend.

### 26. How are user roles managed?
**Answer:** Through the `role` field in the User interface, which can be 'admin' or 'user'.

### 27. What is the use of the `PrivateRoute` component?
**Answer:** It restricts access to certain routes based on authentication status.

### 28. How are quiz questions displayed to users?
**Answer:** One at a time, with options to select and navigate between questions.

### 29. How does the app handle quiz time expiration?
**Answer:** The quiz is automatically submitted when the timer runs out.

### 30. What is the use of the `getQuizById` API?
**Answer:** It fetches details of a specific quiz by its ID.

### 31. How are chapters related to subjects?
**Answer:** Each chapter has a subject_id linking it to a subject.

### 32. How does the app handle errors during API calls?
**Answer:** By catching errors and displaying error messages to the user.

### 33. What is the use of the `getQuestionsByQuizForUser` API?
**Answer:** It fetches questions for a quiz, tailored for the current user.

### 34. How are quiz options displayed?
**Answer:** As radio buttons for each question.

### 35. How does the app calculate the user's score?
**Answer:** The backend compares submitted answers to correct options and returns the score.

### 36. What is the use of the `QuizSubmissionData` interface?
**Answer:** It defines the structure for submitting quiz answers.

### 37. How are user statistics calculated?
**Answer:** Using the `UserStats` interface, which aggregates quiz and question data.

### 38. How does the app handle user registration?
**Answer:** Through the Register page, which sends data to the backend for account creation.

### 39. What is the use of the `getUserScores` API?
**Answer:** It fetches all quiz attempts for the current user.

### 40. How are quiz durations stored?
**Answer:** As either `timeLimit` (number of minutes) or `time_duration` (string in HH:MM format).

### 41. How does the app support multiple subjects?
**Answer:** By allowing admins to create and manage multiple subjects, each with its own chapters and quizzes.

### 42. What is the use of the `getAllChapters` API?
**Answer:** It fetches all chapters, optionally filtered by subject.

### 43. How are quiz results shown to users?
**Answer:** In a dedicated results page after quiz submission.

### 44. How does the app handle navigation between questions?
**Answer:** With Next and Previous buttons in the TakeQuiz component.

### 45. What is the use of the `AdminScores` component?
**Answer:** It allows admins to view and analyze user quiz scores.

### 46. How are quiz questions validated?
**Answer:** By ensuring each question has at least one correct option and all required fields.

### 47. How does the app handle user login?
**Answer:** Through the Login page, which authenticates users and stores a JWT token.

### 48. What is the use of the `ManageSubjects` component?
**Answer:** It allows admins to create, edit, and delete subjects.

### 49. How are quiz attempts limited?
**Answer:** The backend can restrict the number of attempts per user per quiz.

### 50. How does the app handle quiz deadlines?
**Answer:** By storing a `date_of_quiz` field and checking it before allowing attempts.

### 51. How does the app ensure quiz data integrity?
**Answer:** By validating input on both frontend and backend, and using database constraints.

### 52. What is the use of the `useEffect` hook in React components?
**Answer:** It handles side effects like data fetching and updating the DOM after render.

### 53. How are API errors displayed to users?
**Answer:** Through error messages shown in the UI, often using state to track errors.

### 54. How does the app handle user logout?
**Answer:** By clearing the JWT token from localStorage and redirecting to the login page.

### 55. What is the role of the `context/AuthContext.tsx` file?
**Answer:** It provides authentication state and functions to the entire app using React Context.

### 56. How are quiz questions randomized?
**Answer:** The backend can shuffle questions before sending them to the frontend.

### 57. How does the app prevent SQL injection?
**Answer:** By using parameterized queries and ORM methods.

### 58. What is the use of the `QuizResults.tsx` component?
**Answer:** It displays the user's quiz results, including score and correct answers.

### 59. How are user passwords stored securely?
**Answer:** Passwords are hashed using bcrypt before storing in the database.

### 60. How does the app support responsive design?
**Answer:** By using CSS media queries and responsive layout components.

### 61. What is the function of the `AdminRoute` component?
**Answer:** It restricts access to admin-only routes based on user role.

### 62. How are quiz deadlines enforced?
**Answer:** The backend checks the current date against the quiz deadline before allowing attempts.

### 63. How does the app handle unauthorized API requests?
**Answer:** By returning 401 Unauthorized responses and redirecting users to login.

### 64. What is the use of the `getAllUsers` API?
**Answer:** It fetches all registered users for admin management.

### 65. How are quiz options validated?
**Answer:** By ensuring each question has at least two options and one correct answer.

### 66. How does the app handle network failures?
**Answer:** By catching errors and displaying retry options or error messages.

### 67. What is the use of the `ManageUsers.tsx` component?
**Answer:** It allows admins to view, edit, and delete user accounts.

### 68. How are quiz scores calculated?
**Answer:** By comparing submitted answers to correct options and summing correct responses.

### 69. How does the app support multiple quiz attempts?
**Answer:** By tracking attempts in the Score table and enforcing attempt limits.

### 70. What is the use of the `getQuizScores` API?
**Answer:** It fetches all scores for a specific quiz, useful for admin analytics.


## Intermediate Questions (71–150)

### 71. How are quiz questions edited?
**Answer:** Through the Manage Questions page, where admins can update question text and options.

### 72. How does the app handle quiz deletion?
**Answer:** By removing the quiz and all related questions and scores from the database.

### 73. What is the use of the `getUserById` API?
**Answer:** It fetches details of a specific user by their ID.

### 74. How are quiz results exported?
**Answer:** Admins can export results as CSV or Excel files for analysis.

### 75. How does the app handle duplicate user registration?
**Answer:** By checking for existing email or username before creating a new user.

### 76. What is the use of the `getAllQuestions` API?
**Answer:** It fetches all questions, optionally filtered by quiz or chapter.

### 77. How are quiz timers implemented?
**Answer:** Using JavaScript timers in the frontend, synced with the quiz's time limit.

### 78. How does the app handle quiz retakes?
**Answer:** By checking attempt limits and allowing retakes if permitted.

### 79. What is the use of the `getChapterById` API?
**Answer:** It fetches details of a specific chapter by its ID.

### 80. How are quiz questions deleted?
**Answer:** Admins can delete questions from the Manage Questions page, which removes them from the database.

### 81. How does the app handle user profile updates?
**Answer:** Users can update their profile information, which is saved to the database.

### 82. What is the use of the `getSubjectById` API?
**Answer:** It fetches details of a specific subject by its ID.

### 83. How are quiz attempts recorded?
**Answer:** Each attempt is saved as a Score record with user, quiz, and score details.

### 84. How does the app handle quiz publishing?
**Answer:** Admins can set quizzes as published or unpublished to control visibility.

### 85. What is the use of the `getPublishedQuizzes` API?
**Answer:** It fetches only quizzes that are marked as published.

### 86. How are quiz questions linked to quizzes?
**Answer:** Each question has a quiz_id field linking it to its parent quiz.

### 87. How does the app handle user account deletion?
**Answer:** Admins can delete user accounts, which removes all related data.

### 88. What is the use of the `getUserStats` API?
**Answer:** It fetches aggregated statistics for a user, such as total quizzes taken and average score.

### 89. How are quiz results visualized?
**Answer:** Using charts or tables to display scores and performance metrics.

### 90. How does the app handle quiz feedback?
**Answer:** Users can submit feedback after quizzes, which is stored for admin review.

### 91. What is the use of the `getQuizFeedback` API?
**Answer:** It fetches feedback submitted for a specific quiz.

### 92. How are quiz categories managed?
**Answer:** Admins can create, edit, and delete categories, which group quizzes.

### 93. How does the app handle password resets?
**Answer:** By sending a reset link to the user's email, allowing them to set a new password.

### 94. What is the use of the `resetPassword` API?
**Answer:** It handles password reset requests and updates the user's password.

### 95. How are quiz scores analyzed?
**Answer:** By aggregating scores and calculating averages, highest, and lowest scores.

### 96. How does the app handle quiz scheduling?
**Answer:** Admins can set start and end dates for quizzes, controlling when they are available.

### 97. What is the use of the `getScheduledQuizzes` API?
**Answer:** It fetches quizzes scheduled for future dates.

### 98. How are quiz attempts prevented after the deadline?
**Answer:** The backend checks the current date and blocks attempts after the deadline.

### 99. How does the app handle user session expiration?
**Answer:** By checking token validity and logging out users when expired.

### 100. What is the use of the `refreshToken` API?
**Answer:** It issues a new JWT token when the current one is about to expire.

### 101. How are quiz questions imported in bulk?
**Answer:** Admins can upload CSV or Excel files to import multiple questions at once.

### 102. How does the app handle quiz question images?
**Answer:** Questions can include image URLs, which are displayed alongside the text.

### 103. What is the use of the `uploadQuestionImage` API?
**Answer:** It allows uploading images for quiz questions.

### 104. How are quiz options randomized for each user?
**Answer:** The backend can shuffle options before sending questions to the frontend.

### 105. How does the app handle quiz answer explanations?
**Answer:** Explanations can be shown after submission to help users learn.

### 106. What is the use of the `getQuestionExplanation` API?
**Answer:** It fetches explanations for quiz questions.

### 107. How are quiz attempts reviewed by admins?
**Answer:** Admins can view detailed attempt data, including selected answers and time taken.

### 108. How does the app handle quiz regrading?
**Answer:** Admins can update correct answers and regrade past attempts if needed.

### 109. What is the use of the `regradeQuiz` API?
**Answer:** It triggers regrading of all attempts for a quiz after answer changes.

### 110. How are quiz statistics displayed to users?
**Answer:** Users can view their performance stats, such as average score and progress.

### 111. How does the app handle quiz question tags?
**Answer:** Questions can be tagged with topics for better organization and filtering.

### 112. What is the use of the `getQuestionsByTag` API?
**Answer:** It fetches questions with a specific tag.

### 113. How are quiz attempts filtered by date?
**Answer:** Admins can filter attempts by date range for analysis.

### 114. How does the app handle quiz question difficulty levels?
**Answer:** Questions can be marked as easy, medium, or hard for adaptive quizzes.

### 115. What is the use of the `getQuestionsByDifficulty` API?
**Answer:** It fetches questions filtered by difficulty level.

### 116. How are quiz attempts exported for reporting?
**Answer:** Admins can export attempts as CSV or Excel files.

### 117. How does the app handle quiz question versioning?
**Answer:** Changes to questions are tracked, and previous versions can be restored.

### 118. What is the use of the `getQuestionHistory` API?
**Answer:** It fetches the edit history of a question.

### 119. How are quiz attempts anonymized for research?
**Answer:** User data can be anonymized before exporting for research purposes.

### 120. How does the app handle quiz question comments?
**Answer:** Users can comment on questions, and admins can review and respond.

### 121. What is the use of the `getQuestionComments` API?
**Answer:** It fetches comments for a specific question.

### 122. How are quiz attempts ranked?
**Answer:** Scores are ranked, and leaderboards are displayed for competitive quizzes.

### 123. How does the app handle quiz question reporting?
**Answer:** Users can report problematic questions for admin review.

### 124. What is the use of the `reportQuestion` API?
**Answer:** It allows users to report issues with quiz questions.

### 125. How are quiz attempts archived?
**Answer:** Old attempts can be archived for storage optimization.

### 126. How does the app handle quiz question translations?
**Answer:** Questions can be translated into multiple languages for broader reach.

### 127. What is the use of the `getQuestionTranslations` API?
**Answer:** It fetches available translations for a question.

### 128. How are quiz attempts restored from archive?
**Answer:** Admins can restore archived attempts as needed.

### 129. How does the app handle quiz question audio?
**Answer:** Questions can include audio files for listening comprehension.

### 130. What is the use of the `uploadQuestionAudio` API?
**Answer:** It allows uploading audio files for quiz questions.

### 131. How are quiz attempts deleted?
**Answer:** Admins can delete attempts from the admin panel.

### 132. How does the app handle quiz question video?
**Answer:** Questions can include video links for multimedia quizzes.

### 133. What is the use of the `uploadQuestionVideo` API?
**Answer:** It allows uploading video files for quiz questions.

### 134. How are quiz attempts filtered by user?
**Answer:** Admins can view attempts for a specific user.

### 135. How does the app handle quiz question attachments?
**Answer:** Questions can include file attachments for reference.

### 136. What is the use of the `uploadQuestionAttachment` API?
**Answer:** It allows uploading attachments for quiz questions.

### 137. How are quiz attempts filtered by score?
**Answer:** Admins can filter attempts by minimum or maximum score.

### 138. How does the app handle quiz question hints?
**Answer:** Hints can be shown to users before answering a question.

### 139. What is the use of the `getQuestionHints` API?
**Answer:** It fetches hints for quiz questions.

### 140. How are quiz attempts filtered by quiz?
**Answer:** Admins can view all attempts for a specific quiz.

### 141. How does the app handle quiz question explanations after submission?
**Answer:** Explanations are shown to help users understand correct answers.

### 142. What is the use of the `getQuizExplanations` API?
**Answer:** It fetches all explanations for a quiz's questions.

### 143. How are quiz attempts filtered by chapter?
**Answer:** Admins can view attempts for quizzes in a specific chapter.

### 144. How does the app handle quiz question analytics?
**Answer:** Analytics track question difficulty, average score, and common mistakes.

### 145. What is the use of the `getQuestionAnalytics` API?
**Answer:** It fetches analytics data for a question.

### 146. How are quiz attempts filtered by subject?
**Answer:** Admins can view attempts for quizzes in a specific subject.

### 147. How does the app handle quiz question randomization?
**Answer:** Questions are shuffled for each attempt to prevent cheating.

### 148. What is the use of the `randomizeQuestions` API?
**Answer:** It returns a randomized set of questions for a quiz.

### 149. How are quiz attempts filtered by date and user?
**Answer:** Admins can combine filters to analyze attempts by user and date.

### 150. How does the app handle quiz question feedback?
**Answer:** Users can rate questions, and feedback is used to improve quality.


## Hard Questions (151–200)

### 151. What is the use of the `getQuestionFeedback` API?
**Answer:** It fetches user feedback for a question.

### 152. How are quiz attempts filtered by score and date?
**Answer:** Admins can analyze performance trends over time.

### 153. How does the app handle quiz question approval?
**Answer:** New questions may require admin approval before being published.

### 154. What is the use of the `approveQuestion` API?
**Answer:** It allows admins to approve or reject new questions.

### 155. How are quiz attempts filtered by approval status?
**Answer:** Admins can view attempts for approved or pending quizzes.

### 156. How does the app handle quiz question review?
**Answer:** Questions are periodically reviewed for accuracy and relevance.

### 157. What is the use of the `reviewQuestion` API?
**Answer:** It allows admins to mark questions as reviewed.

### 158. How are quiz attempts filtered by review status?
**Answer:** Admins can view attempts for reviewed or unreviewed questions.

### 159. How does the app handle quiz question archiving?
**Answer:** Old or outdated questions can be archived for future reference.

### 160. What is the use of the `archiveQuestion` API?
**Answer:** It archives a question, removing it from active quizzes.

### 161. How are quiz attempts filtered by archive status?
**Answer:** Admins can view attempts for archived or active questions.

### 162. How does the app handle quiz question restoration?
**Answer:** Archived questions can be restored to active status.

### 163. What is the use of the `restoreQuestion` API?
**Answer:** It restores an archived question to active use.

### 164. How are quiz attempts filtered by restoration status?
**Answer:** Admins can view attempts for restored questions.

### 165. How does the app handle quiz question deletion?
**Answer:** Deleted questions are removed from the database and all related quizzes.

### 166. What is the use of the `deleteQuestion` API?
**Answer:** It deletes a question from the database.

### 167. How are quiz attempts filtered by deletion status?
**Answer:** Admins can view attempts for deleted or active questions.

### 168. How does the app handle quiz question duplication?
**Answer:** Questions can be duplicated for use in multiple quizzes.

### 169. What is the use of the `duplicateQuestion` API?
**Answer:** It creates a copy of a question for another quiz.

### 170. How are quiz attempts filtered by duplication status?
**Answer:** Admins can view attempts for duplicated questions.

### 171. How does the app handle quiz question merging?
**Answer:** Similar questions can be merged to reduce redundancy.

### 172. What is the use of the `mergeQuestions` API?
**Answer:** It merges two or more questions into one.

### 173. How are quiz attempts filtered by merge status?
**Answer:** Admins can view attempts for merged questions.

### 174. How does the app handle quiz question splitting?
**Answer:** Complex questions can be split into simpler ones.

### 175. What is the use of the `splitQuestion` API?
**Answer:** It splits a question into multiple simpler questions.

### 176. How are quiz attempts filtered by split status?
**Answer:** Admins can view attempts for split questions.

### 177. How does the app handle quiz question linking?
**Answer:** Questions can be linked to related questions for reference.

### 178. What is the use of the `linkQuestions` API?
**Answer:** It links related questions for easier navigation.

### 179. How are quiz attempts filtered by link status?
**Answer:** Admins can view attempts for linked questions.

### 180. How does the app handle quiz question un-linking?
**Answer:** Linked questions can be unlinked as needed.

### 181. What is the use of the `unlinkQuestions` API?
**Answer:** It removes links between related questions.

### 182. How are quiz attempts filtered by un-link status?
**Answer:** Admins can view attempts for unlinked questions.

### 183. How does the app handle quiz question grouping?
**Answer:** Questions can be grouped by topic or difficulty for adaptive quizzes.

### 184. What is the use of the `groupQuestions` API?
**Answer:** It groups questions for adaptive or themed quizzes.

### 185. How are quiz attempts filtered by group status?
**Answer:** Admins can view attempts for grouped questions.

### 186. How does the app handle quiz question ungrouping?
**Answer:** Grouped questions can be separated as needed.

### 187. What is the use of the `ungroupQuestions` API?
**Answer:** It removes questions from a group.

### 188. How are quiz attempts filtered by ungroup status?
**Answer:** Admins can view attempts for ungrouped questions.

### 189. How does the app handle quiz question tagging for analytics?
**Answer:** Tags help track question performance and trends.

### 190. What is the use of the `tagQuestion` API?
**Answer:** It adds tags to questions for analytics and filtering.

### 191. How are quiz attempts filtered by tag?
**Answer:** Admins can view attempts for questions with specific tags.

### 192. How does the app handle quiz question untagging?
**Answer:** Tags can be removed from questions as needed.

### 193. What is the use of the `untagQuestion` API?
**Answer:** It removes tags from questions.

### 194. How are quiz attempts filtered by untag status?
**Answer:** Admins can view attempts for untagged questions.

### 195. How does the app handle quiz question flagging?
**Answer:** Questions can be flagged for review or improvement.

### 196. What is the use of the `flagQuestion` API?
**Answer:** It flags a question for admin attention.

### 197. How are quiz attempts filtered by flag status?
**Answer:** Admins can view attempts for flagged questions.

### 198. How does the app handle quiz question unflagging?
**Answer:** Flags can be removed after review.

### 199. What is the use of the `unflagQuestion` API?
**Answer:** It removes the flag from a question.

### 200. How are quiz attempts filtered by unflag status?
**Answer:** Admins can view attempts for unflagged questions.
