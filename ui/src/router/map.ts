export enum RouteMap {
    NOT_FOUND = "*",
    LOGIN = "/",
    COMPLETE_REGISTERING = "/complete-register",

    HOME = "/home",
    USER_PROFILE = "/user-profile",
    USERS_PROPERTIES = "/users-properties",
    APPRENTICE_RESULTS = "/apprentice/results",
    SUBJECT_RESULTS = "/apprentice/results/:subjectId",
    BIRTHDAYS = "/birthdays",
    USERS_OVERVIEW = "/users",

    SCHOOL_CONTENT = "/school-content",
    CURRICULAR_UNITS = "/curricular-units",
    CURRICULAR_UNITY_BY_ID = "/curricular-units/:id",


    CLASSES = "/classes",
    NEW_CLASS = "/classes/new",
    CLASS_DETAILS = "/classes/:classId",    
    SUBJECT_DETAILS = "/classes/:classId/subject/:subjectId",
    CREATE_EXAM = "/classes/:classId/subject/:subjectId/new-exam",
    EVALUATE_EXAM = "/classes/:classId/subject/:subjectId/evaluate-exam/:examId",
    // NEW_SUBJECT_TEST = "/classes/:classId/subject/:id/new-test",
    // AVALIATION_RESULT = "/classes/:classId/subject/test/result/:id",
}