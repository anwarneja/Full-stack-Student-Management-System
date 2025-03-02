// // const isAuthenticated = (req, res, next) => {
// //     if (req.session.user) {
// //         return next();
// //     }
// //     res.redirect("/login");
// // };

// // const isAdmin = (req, res, next) => {
// //     if (req.session.user && req.session.user.role === "admin") {
// //         return next();
// //     }
// //     res.status(403).send("Access Denied: Admins only");
// // };

// // const isTeacher = (req, res, next) => {
// //     if (req.session.user && req.session.user.role === "teacher") {
// //         return next();
// //     }
// //     res.status(403).send("Access Denied: Teachers only");
// // };

// // const isStudent = (req, res, next) => {
// //     if (req.session.user && req.session.user.role === "student") {
// //         return next();
// //     }
// //     res.status(403).send("Access Denied: Students only");
// // };

// // module.exports = { isAuthenticated, isAdmin, isTeacher, isStudent };


// function isAuthenticated(req, res, next) {
//     if (req.session.user) {
//         return next();
//     }
//     res.redirect("/login");
// }

// function isAdmin(req, res, next) {
//     if (req.session.user && req.session.user.role === "admin") {
//         return next();
//     }
//     res.status(403).send("Access Denied: Admins only");
// }
// // const ensureAdmin = (req, res, next) => {
// //     if (!req.session.user || req.session.user.role !== "admin") {
// //         return res.status(403).send("Access Denied");
// //     }
// //     next();
// // };

// function isTeacher(req, res, next) {
//     if (req.session.user && req.session.user.role === "teacher") {
//         return next();
//     }
//     res.status(403).send("Access Denied: Teachers only");
// }

// function isStudent(req, res, next) {
//     if (req.session.user && req.session.user.role === "student") {
//         return next();
//     }
//     res.status(403).send("Access Denied: Students only");
// }

// module.exports = { isAuthenticated, isAdmin, isTeacher, isStudent };


function isAuthenticated(req, res, next) {
    if (req.session.user) return next();
    res.redirect("/login");
}

function isAdmin(req, res, next) {
    if (!req.session.user) return res.redirect("/login")
    if (req.session.user.role !== "admin") return res.status(403).send("Access Denied: Admins only");

    next();

}

function isTeacher(req, res, next) {
    if (req.session.user?.role === "teacher") return next();
    res.status(403).send("Access Denied: Teachers only");
}

function isStudent(req, res, next) {
    if (req.session.user?.role === "student") return next();
    res.status(403).send("Access Denied: Students only");
}

module.exports = { isAuthenticated, isAdmin, isTeacher, isStudent };
