export enum RouteMap {
    NOT_FOUND = "*",
    LOGIN = "/",
    COMPLETE_REGISTERING = "/user/register",

    HOME = "/home",
    APPRENTICE_RESULTS = "/apprentice/results",
    SUBJECT_RESULTS = "/apprentice/results/:id",
    BIRTHDAYS = "/birthdays",

    SCHOOL_CONTENT = "/school-content",
    CURRICULAR_UNITY_BY_ID = "/school-content/curricular-unitys",

    CLASSES = "/classes",
    CLASS_DETAILS = "/classes/:id",
    SUBJECT_DETAILS = "/classes/subject/:id",
    NEW_SUBJECT_TEST = "/classes/subject/:id/new-test",
    AVALIATION_RESULT = "/classes/subject/test/result/:id",
    STUDENT_OVERVIEW = "/classes/student/:id"
}