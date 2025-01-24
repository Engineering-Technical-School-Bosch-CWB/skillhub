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

    CLASSES = "/class",
    CLASS_DETAILS = "/class/:id",
    SUBJECT_DETAILS = "/class/subject/:id",
    NEW_SUBJECT_TEST = "/class/subject/:id/new-test",
    AVALIATION_RESULT = "/class/subject/test/result/:id",
    STUDENT_OVERVIEW = "/class/student/:id"
}