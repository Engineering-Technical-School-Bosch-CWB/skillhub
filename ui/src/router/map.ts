export enum RouteMap {
    NOT_FOUND = "*",
    LOGIN = "/",
    COMPLETE_REGISTERING = "/complete-register",

    HOME = "/home",
    APPRENTICE_PROFILE = "/aaa",
    APPRENTICE_RESULTS = "/apprentice/results",
    SUBJECT_RESULTS = "/apprentice/results/:subjectId",
    BIRTHDAYS = "/birthdays",
    USERS_OVERVIEW = "/users",

    SCHOOL_CONTENT = "/school-content",
    CURRICULAR_UNITY_BY_ID = "/school-content/curricular-unitys",

    CLASSES = "/classes",
    NEW_CLASS = "/classes/new",
    CLASS_DETAILS = "/classes/:classId",    
    SUBJECT_DETAILS = "/classes/:classId/subject/:subjectId",
    NEW_SUBJECT_TEST = "/classes/:classId/subject/:id/new-test",
    AVALIATION_RESULT = "/classes/:classId/subject/test/result/:id",
    STUDENT_OVERVIEW = "/classes/:classId/student/:studentId"
}