"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/users/route";
exports.ids = ["app/api/admin/users/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_kanth_Downloads_Devlop_shreebalaji_shreebalaji_src_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/users/route.ts */ \"(rsc)/./src/app/api/admin/users/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/users/route\",\n        pathname: \"/api/admin/users\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/users/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\kanth\\\\Downloads\\\\Devlop\\\\shreebalaji\\\\shreebalaji\\\\src\\\\app\\\\api\\\\admin\\\\users\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_kanth_Downloads_Devlop_shreebalaji_shreebalaji_src_app_api_admin_users_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/users/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRnVzZXJzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZ1c2VycyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNrYW50aCU1Q0Rvd25sb2FkcyU1Q0RldmxvcCU1Q3NocmVlYmFsYWppJTVDc2hyZWViYWxhamklNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2thbnRoJTVDRG93bmxvYWRzJTVDRGV2bG9wJTVDc2hyZWViYWxhamklNUNzaHJlZWJhbGFqaSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDb0Q7QUFDakk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaHJlZS1iYWxhamktY2F0ZXJlcnMvPzlkYTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxca2FudGhcXFxcRG93bmxvYWRzXFxcXERldmxvcFxcXFxzaHJlZWJhbGFqaVxcXFxzaHJlZWJhbGFqaVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFx1c2Vyc1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hZG1pbi91c2Vyc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxrYW50aFxcXFxEb3dubG9hZHNcXFxcRGV2bG9wXFxcXHNocmVlYmFsYWppXFxcXHNocmVlYmFsYWppXFxcXHNyY1xcXFxhcHBcXFxcYXBpXFxcXGFkbWluXFxcXHVzZXJzXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hZG1pbi91c2Vycy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/users/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/admin/users/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth_guards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth-guards */ \"(rsc)/./src/lib/auth-guards.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// GET /api/admin/users - Super Admin only: List all staff/admin accounts\nasync function GET() {\n    const auth = await (0,_lib_auth_guards__WEBPACK_IMPORTED_MODULE_1__.requireSuperAdminSession)();\n    if (!auth.authorized) return auth.errorResponse;\n    try {\n        const users = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findMany({\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                phone: true,\n                role: true,\n                createdAt: true\n            },\n            orderBy: {\n                createdAt: \"desc\"\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            users\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch users\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST /api/admin/users - Super Admin only: Create a new Admin or Super Admin account\nasync function POST(req) {\n    const auth = await (0,_lib_auth_guards__WEBPACK_IMPORTED_MODULE_1__.requireSuperAdminSession)();\n    if (!auth.authorized) return auth.errorResponse;\n    try {\n        const { name, email, password, phone, role } = await req.json();\n        if (!name || !email || !password) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Name, email, and password are required\"\n            }, {\n                status: 400\n            });\n        }\n        if (password.length < 6) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Password must be at least 6 characters long\"\n            }, {\n                status: 400\n            });\n        }\n        const normalizedEmail = email.toLowerCase().trim();\n        const existingUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n            where: {\n                email: normalizedEmail\n            }\n        });\n        if (existingUser) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"User with this email already exists\"\n            }, {\n                status: 400\n            });\n        }\n        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_3___default().hash(password, 10);\n        const newUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.create({\n            data: {\n                name,\n                email: normalizedEmail,\n                password: hashedPassword,\n                phone: phone || null,\n                role: role === \"SUPER_ADMIN\" ? \"SUPER_ADMIN\" : \"ADMIN\"\n            },\n            select: {\n                id: true,\n                name: true,\n                email: true,\n                phone: true,\n                role: true,\n                createdAt: true\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: newUser\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to create user\"\n        }, {\n            status: 500\n        });\n    }\n}\n// DELETE /api/admin/users - Super Admin only: Remove a staff account\nasync function DELETE(req) {\n    const auth = await (0,_lib_auth_guards__WEBPACK_IMPORTED_MODULE_1__.requireSuperAdminSession)();\n    if (!auth.authorized) return auth.errorResponse;\n    try {\n        const { id } = await req.json();\n        if (id === auth.user.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"You cannot delete your own account\"\n            }, {\n                status: 400\n            });\n        }\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.delete({\n            where: {\n                id\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to delete user\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi91c2Vycy9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEyQztBQUNrQjtBQUN2QjtBQUNSO0FBRTlCLHlFQUF5RTtBQUNsRSxlQUFlSTtJQUNwQixNQUFNQyxPQUFPLE1BQU1KLDBFQUF3QkE7SUFDM0MsSUFBSSxDQUFDSSxLQUFLQyxVQUFVLEVBQUUsT0FBT0QsS0FBS0UsYUFBYTtJQUUvQyxJQUFJO1FBQ0YsTUFBTUMsUUFBUSxNQUFNTiwrQ0FBTUEsQ0FBQ08sSUFBSSxDQUFDQyxRQUFRLENBQUM7WUFDdkNDLFFBQVE7Z0JBQ05DLElBQUk7Z0JBQ0pDLE1BQU07Z0JBQ05DLE9BQU87Z0JBQ1BDLE9BQU87Z0JBQ1BDLE1BQU07Z0JBQ05DLFdBQVc7WUFDYjtZQUNBQyxTQUFTO2dCQUFFRCxXQUFXO1lBQU87UUFDL0I7UUFDQSxPQUFPakIscURBQVlBLENBQUNtQixJQUFJLENBQUM7WUFBRVg7UUFBTTtJQUNuQyxFQUFFLE9BQU9ZLE9BQU87UUFDZCxPQUFPcEIscURBQVlBLENBQUNtQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGO0FBRUEsc0ZBQXNGO0FBQy9FLGVBQWVDLEtBQUtDLEdBQVk7SUFDckMsTUFBTWxCLE9BQU8sTUFBTUosMEVBQXdCQTtJQUMzQyxJQUFJLENBQUNJLEtBQUtDLFVBQVUsRUFBRSxPQUFPRCxLQUFLRSxhQUFhO0lBRS9DLElBQUk7UUFDRixNQUFNLEVBQUVNLElBQUksRUFBRUMsS0FBSyxFQUFFVSxRQUFRLEVBQUVULEtBQUssRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTU8sSUFBSUosSUFBSTtRQUU3RCxJQUFJLENBQUNOLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDVSxVQUFVO1lBQ2hDLE9BQU94QixxREFBWUEsQ0FBQ21CLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBeUMsR0FDbEQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLElBQUlHLFNBQVNDLE1BQU0sR0FBRyxHQUFHO1lBQ3ZCLE9BQU96QixxREFBWUEsQ0FBQ21CLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBOEMsR0FDdkQ7Z0JBQUVDLFFBQVE7WUFBSTtRQUVsQjtRQUVBLE1BQU1LLGtCQUFrQlosTUFBTWEsV0FBVyxHQUFHQyxJQUFJO1FBRWhELE1BQU1DLGVBQWUsTUFBTTNCLCtDQUFNQSxDQUFDTyxJQUFJLENBQUNxQixVQUFVLENBQUM7WUFDaERDLE9BQU87Z0JBQUVqQixPQUFPWTtZQUFnQjtRQUNsQztRQUVBLElBQUlHLGNBQWM7WUFDaEIsT0FBTzdCLHFEQUFZQSxDQUFDbUIsSUFBSSxDQUN0QjtnQkFBRUMsT0FBTztZQUFzQyxHQUMvQztnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsTUFBTVcsaUJBQWlCLE1BQU03QixvREFBVyxDQUFDcUIsVUFBVTtRQUVuRCxNQUFNVSxVQUFVLE1BQU1oQywrQ0FBTUEsQ0FBQ08sSUFBSSxDQUFDMEIsTUFBTSxDQUFDO1lBQ3ZDQyxNQUFNO2dCQUNKdkI7Z0JBQ0FDLE9BQU9ZO2dCQUNQRixVQUFVUTtnQkFDVmpCLE9BQU9BLFNBQVM7Z0JBQ2hCQyxNQUFNQSxTQUFTLGdCQUFnQixnQkFBZ0I7WUFDakQ7WUFDQUwsUUFBUTtnQkFDTkMsSUFBSTtnQkFDSkMsTUFBTTtnQkFDTkMsT0FBTztnQkFDUEMsT0FBTztnQkFDUEMsTUFBTTtnQkFDTkMsV0FBVztZQUNiO1FBQ0Y7UUFFQSxPQUFPakIscURBQVlBLENBQUNtQixJQUFJLENBQUM7WUFBRWtCLFNBQVM7WUFBTTVCLE1BQU15QjtRQUFRLEdBQUc7WUFBRWIsUUFBUTtRQUFJO0lBQzNFLEVBQUUsT0FBT0QsT0FBTztRQUNkLE9BQU9wQixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXdCLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdFO0FBQ0Y7QUFFQSxxRUFBcUU7QUFDOUQsZUFBZWlCLE9BQU9mLEdBQVk7SUFDdkMsTUFBTWxCLE9BQU8sTUFBTUosMEVBQXdCQTtJQUMzQyxJQUFJLENBQUNJLEtBQUtDLFVBQVUsRUFBRSxPQUFPRCxLQUFLRSxhQUFhO0lBRS9DLElBQUk7UUFDRixNQUFNLEVBQUVLLEVBQUUsRUFBRSxHQUFHLE1BQU1XLElBQUlKLElBQUk7UUFFN0IsSUFBSVAsT0FBT1AsS0FBS0ksSUFBSSxDQUFDRyxFQUFFLEVBQUU7WUFDdkIsT0FBT1oscURBQVlBLENBQUNtQixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBcUMsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzFGO1FBRUEsTUFBTW5CLCtDQUFNQSxDQUFDTyxJQUFJLENBQUM4QixNQUFNLENBQUM7WUFBRVIsT0FBTztnQkFBRW5CO1lBQUc7UUFBRTtRQUN6QyxPQUFPWixxREFBWUEsQ0FBQ21CLElBQUksQ0FBQztZQUFFa0IsU0FBUztRQUFLO0lBQzNDLEVBQUUsT0FBT2pCLE9BQU87UUFDZCxPQUFPcEIscURBQVlBLENBQUNtQixJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hyZWUtYmFsYWppLWNhdGVyZXJzLy4vc3JjL2FwcC9hcGkvYWRtaW4vdXNlcnMvcm91dGUudHM/NjBkYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IHJlcXVpcmVTdXBlckFkbWluU2Vzc2lvbiB9IGZyb20gXCJAL2xpYi9hdXRoLWd1YXJkc1wiO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuaW1wb3J0IGJjcnlwdCBmcm9tIFwiYmNyeXB0anNcIjtcblxuLy8gR0VUIC9hcGkvYWRtaW4vdXNlcnMgLSBTdXBlciBBZG1pbiBvbmx5OiBMaXN0IGFsbCBzdGFmZi9hZG1pbiBhY2NvdW50c1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgY29uc3QgYXV0aCA9IGF3YWl0IHJlcXVpcmVTdXBlckFkbWluU2Vzc2lvbigpO1xuICBpZiAoIWF1dGguYXV0aG9yaXplZCkgcmV0dXJuIGF1dGguZXJyb3JSZXNwb25zZTtcblxuICB0cnkge1xuICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZE1hbnkoe1xuICAgICAgc2VsZWN0OiB7XG4gICAgICAgIGlkOiB0cnVlLFxuICAgICAgICBuYW1lOiB0cnVlLFxuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgcGhvbmU6IHRydWUsXG4gICAgICAgIHJvbGU6IHRydWUsXG4gICAgICAgIGNyZWF0ZWRBdDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBvcmRlckJ5OiB7IGNyZWF0ZWRBdDogXCJkZXNjXCIgfSxcbiAgICB9KTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyB1c2VycyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggdXNlcnNcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbi8vIFBPU1QgL2FwaS9hZG1pbi91c2VycyAtIFN1cGVyIEFkbWluIG9ubHk6IENyZWF0ZSBhIG5ldyBBZG1pbiBvciBTdXBlciBBZG1pbiBhY2NvdW50XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3QgYXV0aCA9IGF3YWl0IHJlcXVpcmVTdXBlckFkbWluU2Vzc2lvbigpO1xuICBpZiAoIWF1dGguYXV0aG9yaXplZCkgcmV0dXJuIGF1dGguZXJyb3JSZXNwb25zZTtcblxuICB0cnkge1xuICAgIGNvbnN0IHsgbmFtZSwgZW1haWwsIHBhc3N3b3JkLCBwaG9uZSwgcm9sZSB9ID0gYXdhaXQgcmVxLmpzb24oKTtcblxuICAgIGlmICghbmFtZSB8fCAhZW1haWwgfHwgIXBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiTmFtZSwgZW1haWwsIGFuZCBwYXNzd29yZCBhcmUgcmVxdWlyZWRcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDYpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycyBsb25nXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRFbWFpbCA9IGVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpO1xuXG4gICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBlbWFpbDogbm9ybWFsaXplZEVtYWlsIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoZXhpc3RpbmdVc2VyKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgZXJyb3I6IFwiVXNlciB3aXRoIHRoaXMgZW1haWwgYWxyZWFkeSBleGlzdHNcIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChwYXNzd29yZCwgMTApO1xuXG4gICAgY29uc3QgbmV3VXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIGVtYWlsOiBub3JtYWxpemVkRW1haWwsXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcbiAgICAgICAgcGhvbmU6IHBob25lIHx8IG51bGwsXG4gICAgICAgIHJvbGU6IHJvbGUgPT09IFwiU1VQRVJfQURNSU5cIiA/IFwiU1VQRVJfQURNSU5cIiA6IFwiQURNSU5cIixcbiAgICAgIH0sXG4gICAgICBzZWxlY3Q6IHtcbiAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgIG5hbWU6IHRydWUsXG4gICAgICAgIGVtYWlsOiB0cnVlLFxuICAgICAgICBwaG9uZTogdHJ1ZSxcbiAgICAgICAgcm9sZTogdHJ1ZSxcbiAgICAgICAgY3JlYXRlZEF0OiB0cnVlLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIHVzZXI6IG5ld1VzZXIgfSwgeyBzdGF0dXM6IDIwMSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gY3JlYXRlIHVzZXJcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG5cbi8vIERFTEVURSAvYXBpL2FkbWluL3VzZXJzIC0gU3VwZXIgQWRtaW4gb25seTogUmVtb3ZlIGEgc3RhZmYgYWNjb3VudFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURShyZXE6IFJlcXVlc3QpIHtcbiAgY29uc3QgYXV0aCA9IGF3YWl0IHJlcXVpcmVTdXBlckFkbWluU2Vzc2lvbigpO1xuICBpZiAoIWF1dGguYXV0aG9yaXplZCkgcmV0dXJuIGF1dGguZXJyb3JSZXNwb25zZTtcblxuICB0cnkge1xuICAgIGNvbnN0IHsgaWQgfSA9IGF3YWl0IHJlcS5qc29uKCk7XG5cbiAgICBpZiAoaWQgPT09IGF1dGgudXNlci5pZCkge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiWW91IGNhbm5vdCBkZWxldGUgeW91ciBvd24gYWNjb3VudFwiIH0sIHsgc3RhdHVzOiA0MDAgfSk7XG4gICAgfVxuXG4gICAgYXdhaXQgcHJpc21hLnVzZXIuZGVsZXRlKHsgd2hlcmU6IHsgaWQgfSB9KTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgdXNlclwiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJyZXF1aXJlU3VwZXJBZG1pblNlc3Npb24iLCJwcmlzbWEiLCJiY3J5cHQiLCJHRVQiLCJhdXRoIiwiYXV0aG9yaXplZCIsImVycm9yUmVzcG9uc2UiLCJ1c2VycyIsInVzZXIiLCJmaW5kTWFueSIsInNlbGVjdCIsImlkIiwibmFtZSIsImVtYWlsIiwicGhvbmUiLCJyb2xlIiwiY3JlYXRlZEF0Iiwib3JkZXJCeSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsIlBPU1QiLCJyZXEiLCJwYXNzd29yZCIsImxlbmd0aCIsIm5vcm1hbGl6ZWRFbWFpbCIsInRvTG93ZXJDYXNlIiwidHJpbSIsImV4aXN0aW5nVXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImhhc2hlZFBhc3N3b3JkIiwiaGFzaCIsIm5ld1VzZXIiLCJjcmVhdGUiLCJkYXRhIiwic3VjY2VzcyIsIkRFTEVURSIsImRlbGV0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/users/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth-guards.ts":
/*!********************************!*\
  !*** ./src/lib/auth-guards.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAuthSession: () => (/* binding */ getAuthSession),\n/* harmony export */   requireAdminSession: () => (/* binding */ requireAdminSession),\n/* harmony export */   requireSuperAdminSession: () => (/* binding */ requireSuperAdminSession)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\n\nasync function getAuthSession() {\n    return await (0,next_auth__WEBPACK_IMPORTED_MODULE_0__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n}\nasync function requireAdminSession() {\n    const session = await getAuthSession();\n    if (!session || !session.user) {\n        return {\n            authorized: false,\n            errorResponse: next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Authentication required. Please sign in.\"\n            }, {\n                status: 401\n            })\n        };\n    }\n    return {\n        authorized: true,\n        session,\n        user: session.user\n    };\n}\nasync function requireSuperAdminSession() {\n    const authResult = await requireAdminSession();\n    if (!authResult.authorized) {\n        return authResult;\n    }\n    if (authResult.user.role !== \"SUPER_ADMIN\") {\n        return {\n            authorized: false,\n            errorResponse: next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                error: \"Forbidden. Super Admin privileges required.\"\n            }, {\n                status: 403\n            })\n        };\n    }\n    return authResult;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgtZ3VhcmRzLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBNkM7QUFDRjtBQUNGO0FBRWxDLGVBQWVHO0lBQ3BCLE9BQU8sTUFBTUgsMkRBQWdCQSxDQUFDRSxrREFBV0E7QUFDM0M7QUFFTyxlQUFlRTtJQUNwQixNQUFNQyxVQUFVLE1BQU1GO0lBQ3RCLElBQUksQ0FBQ0UsV0FBVyxDQUFDQSxRQUFRQyxJQUFJLEVBQUU7UUFDN0IsT0FBTztZQUNMQyxZQUFZO1lBQ1pDLGVBQWVQLHFEQUFZQSxDQUFDUSxJQUFJLENBQzlCO2dCQUFFQyxPQUFPO1lBQTJDLEdBQ3BEO2dCQUFFQyxRQUFRO1lBQUk7UUFFbEI7SUFDRjtJQUVBLE9BQU87UUFDTEosWUFBWTtRQUNaRjtRQUNBQyxNQUFNRCxRQUFRQyxJQUFJO0lBTXBCO0FBQ0Y7QUFFTyxlQUFlTTtJQUNwQixNQUFNQyxhQUFhLE1BQU1UO0lBQ3pCLElBQUksQ0FBQ1MsV0FBV04sVUFBVSxFQUFFO1FBQzFCLE9BQU9NO0lBQ1Q7SUFFQSxJQUFJQSxXQUFXUCxJQUFJLENBQUNRLElBQUksS0FBSyxlQUFlO1FBQzFDLE9BQU87WUFDTFAsWUFBWTtZQUNaQyxlQUFlUCxxREFBWUEsQ0FBQ1EsSUFBSSxDQUM5QjtnQkFBRUMsT0FBTztZQUE4QyxHQUN2RDtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO0lBQ0Y7SUFFQSxPQUFPRTtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hyZWUtYmFsYWppLWNhdGVyZXJzLy4vc3JjL2xpYi9hdXRoLWd1YXJkcy50cz9jYmZhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCI7XG5pbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9zZXJ2ZXJcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEF1dGhTZXNzaW9uKCkge1xuICByZXR1cm4gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlQWRtaW5TZXNzaW9uKCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0QXV0aFNlc3Npb24oKTtcbiAgaWYgKCFzZXNzaW9uIHx8ICFzZXNzaW9uLnVzZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXV0aG9yaXplZDogZmFsc2UgYXMgY29uc3QsXG4gICAgICBlcnJvclJlc3BvbnNlOiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgeyBlcnJvcjogXCJBdXRoZW50aWNhdGlvbiByZXF1aXJlZC4gUGxlYXNlIHNpZ24gaW4uXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMSB9XG4gICAgICApLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGF1dGhvcml6ZWQ6IHRydWUgYXMgY29uc3QsXG4gICAgc2Vzc2lvbixcbiAgICB1c2VyOiBzZXNzaW9uLnVzZXIgYXMge1xuICAgICAgaWQ6IHN0cmluZztcbiAgICAgIG5hbWU/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgZW1haWw/OiBzdHJpbmcgfCBudWxsO1xuICAgICAgcm9sZTogXCJTVVBFUl9BRE1JTlwiIHwgXCJBRE1JTlwiO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZXF1aXJlU3VwZXJBZG1pblNlc3Npb24oKSB7XG4gIGNvbnN0IGF1dGhSZXN1bHQgPSBhd2FpdCByZXF1aXJlQWRtaW5TZXNzaW9uKCk7XG4gIGlmICghYXV0aFJlc3VsdC5hdXRob3JpemVkKSB7XG4gICAgcmV0dXJuIGF1dGhSZXN1bHQ7XG4gIH1cblxuICBpZiAoYXV0aFJlc3VsdC51c2VyLnJvbGUgIT09IFwiU1VQRVJfQURNSU5cIikge1xuICAgIHJldHVybiB7XG4gICAgICBhdXRob3JpemVkOiBmYWxzZSBhcyBjb25zdCxcbiAgICAgIGVycm9yUmVzcG9uc2U6IE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcIkZvcmJpZGRlbi4gU3VwZXIgQWRtaW4gcHJpdmlsZWdlcyByZXF1aXJlZC5cIiB9LFxuICAgICAgICB7IHN0YXR1czogNDAzIH1cbiAgICAgICksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBhdXRoUmVzdWx0O1xufVxuIl0sIm5hbWVzIjpbImdldFNlcnZlclNlc3Npb24iLCJOZXh0UmVzcG9uc2UiLCJhdXRoT3B0aW9ucyIsImdldEF1dGhTZXNzaW9uIiwicmVxdWlyZUFkbWluU2Vzc2lvbiIsInNlc3Npb24iLCJ1c2VyIiwiYXV0aG9yaXplZCIsImVycm9yUmVzcG9uc2UiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyZXF1aXJlU3VwZXJBZG1pblNlc3Npb24iLCJhdXRoUmVzdWx0Iiwicm9sZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth-guards.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/admin/login\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Please enter your email and password\");\n                }\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email.toLowerCase().trim()\n                    }\n                });\n                if (!user || !user.password) {\n                    throw new Error(\"Invalid credentials\");\n                }\n                const isValidPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password);\n                if (!isValidPassword) {\n                    throw new Error(\"Invalid credentials\");\n                }\n                return {\n                    id: user.id,\n                    name: user.name,\n                    email: user.email,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.id = token.id;\n                session.user.role = token.role;\n            }\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET || \"shreebalaji_secret_jwt_key_2026_super_secure\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDa0U7QUFDcEM7QUFDUTtBQUUvQixNQUFNRyxjQUErQjtJQUMxQ0MsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFDQUMsV0FBVztRQUNUUiwyRUFBbUJBLENBQUM7WUFDbEJTLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVTtvQkFDakQsTUFBTSxJQUFJRSxNQUFNO2dCQUNsQjtnQkFFQSxNQUFNQyxPQUFPLE1BQU1mLCtDQUFNQSxDQUFDZSxJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFDeENDLE9BQU87d0JBQUVSLE9BQU9ELFlBQVlDLEtBQUssQ0FBQ1MsV0FBVyxHQUFHQyxJQUFJO29CQUFHO2dCQUN6RDtnQkFFQSxJQUFJLENBQUNKLFFBQVEsQ0FBQ0EsS0FBS0gsUUFBUSxFQUFFO29CQUMzQixNQUFNLElBQUlFLE1BQU07Z0JBQ2xCO2dCQUVBLE1BQU1NLGtCQUFrQixNQUFNckIsdURBQWMsQ0FBQ1MsWUFBWUksUUFBUSxFQUFFRyxLQUFLSCxRQUFRO2dCQUVoRixJQUFJLENBQUNRLGlCQUFpQjtvQkFDcEIsTUFBTSxJQUFJTixNQUFNO2dCQUNsQjtnQkFFQSxPQUFPO29CQUNMUSxJQUFJUCxLQUFLTyxFQUFFO29CQUNYZixNQUFNUSxLQUFLUixJQUFJO29CQUNmRSxPQUFPTSxLQUFLTixLQUFLO29CQUNqQmMsTUFBTVIsS0FBS1EsSUFBSTtnQkFDakI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFWCxJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlcsTUFBTUosRUFBRSxHQUFHUCxLQUFLTyxFQUFFO2dCQUNsQkksTUFBTUgsSUFBSSxHQUFHLEtBQWNBLElBQUk7WUFDakM7WUFDQSxPQUFPRztRQUNUO1FBQ0EsTUFBTXhCLFNBQVEsRUFBRUEsT0FBTyxFQUFFd0IsS0FBSyxFQUFFO1lBQzlCLElBQUl4QixRQUFRYSxJQUFJLEVBQUU7Z0JBQ2ZiLFFBQVFhLElBQUksQ0FBU08sRUFBRSxHQUFHSSxNQUFNSixFQUFFO2dCQUNsQ3BCLFFBQVFhLElBQUksQ0FBU1EsSUFBSSxHQUFHRyxNQUFNSCxJQUFJO1lBQ3pDO1lBQ0EsT0FBT3JCO1FBQ1Q7SUFDRjtJQUNBeUIsUUFBUUMsUUFBUUMsR0FBRyxDQUFDQyxlQUFlLElBQUk7QUFDekMsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL3NocmVlLWJhbGFqaS1jYXRlcmVycy8uL3NyYy9saWIvYXV0aC50cz82NjkyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCBDcmVkZW50aWFsc1Byb3ZpZGVyIGZyb20gXCJuZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIkAvbGliL3ByaXNtYVwiO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogXCIvYWRtaW4vbG9naW5cIixcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcIkNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiUGFzc3dvcmRcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQbGVhc2UgZW50ZXIgeW91ciBlbWFpbCBhbmQgcGFzc3dvcmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghdXNlciB8fCAhdXNlci5wYXNzd29yZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgY3JlZGVudGlhbHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1ZhbGlkUGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkUGFzc3dvcmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGNyZWRlbnRpYWxzXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgcm9sZTogdXNlci5yb2xlLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgYW55KS5yb2xlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmIChzZXNzaW9uLnVzZXIpIHtcbiAgICAgICAgKHNlc3Npb24udXNlciBhcyBhbnkpLmlkID0gdG9rZW4uaWQ7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgYW55KS5yb2xlID0gdG9rZW4ucm9sZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH0sXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUIHx8IFwic2hyZWViYWxhamlfc2VjcmV0X2p3dF9rZXlfMjAyNl9zdXBlcl9zZWN1cmVcIixcbn07XG4iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsImJjcnlwdCIsInByaXNtYSIsImF1dGhPcHRpb25zIiwic2Vzc2lvbiIsInN0cmF0ZWd5IiwicGFnZXMiLCJzaWduSW4iLCJwcm92aWRlcnMiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwidG9Mb3dlckNhc2UiLCJ0cmltIiwiaXNWYWxpZFBhc3N3b3JkIiwiY29tcGFyZSIsImlkIiwicm9sZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/prisma.ts":
/*!***************************!*\
  !*** ./src/lib/prisma.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log:  true ? [\n        \"query\",\n        \"error\",\n        \"warn\"\n    ] : 0\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL3ByaXNtYS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFFOUMsTUFBTUMsa0JBQWtCQztBQUlqQixNQUFNQyxTQUNYRixnQkFBZ0JFLE1BQU0sSUFDdEIsSUFBSUgsd0RBQVlBLENBQUM7SUFDZkksS0FBS0MsS0FBc0MsR0FBRztRQUFDO1FBQVM7UUFBUztLQUFPLEdBQUcsQ0FBUztBQUN0RixHQUFHO0FBRUwsSUFBSUEsSUFBcUMsRUFBRUosZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2hyZWUtYmFsYWppLWNhdGVyZXJzLy4vc3JjL2xpYi9wcmlzbWEudHM/MDFkNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcblxuY29uc3QgZ2xvYmFsRm9yUHJpc21hID0gZ2xvYmFsVGhpcyBhcyB1bmtub3duIGFzIHtcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgcHJpc21hID1cbiAgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA/P1xuICBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICBsb2c6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcImRldmVsb3BtZW50XCIgPyBbXCJxdWVyeVwiLCBcImVycm9yXCIsIFwid2FyblwiXSA6IFtcImVycm9yXCJdLFxuICB9KTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTtcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fusers%2Froute&page=%2Fapi%2Fadmin%2Fusers%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fusers%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();