// @generated automatically by Diesel CLI.

diesel::table! {
    papers (_id) {
        _id -> Integer,
        employeeId -> Text,
        employeeName -> Text,
        email -> Text,
        paperTitle -> Text,
        journal -> Text,
        publicationYear -> Integer,
    }
}
