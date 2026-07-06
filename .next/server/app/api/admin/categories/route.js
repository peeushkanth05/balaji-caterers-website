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
exports.id = "app/api/admin/categories/route";
exports.ids = ["app/api/admin/categories/route"];
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

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_kanth_Downloads_Devlop_shreebalaji_shreebalaji_src_app_api_admin_categories_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/categories/route.ts */ \"(rsc)/./src/app/api/admin/categories/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/categories/route\",\n        pathname: \"/api/admin/categories\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/categories/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\kanth\\\\Downloads\\\\Devlop\\\\shreebalaji\\\\shreebalaji\\\\src\\\\app\\\\api\\\\admin\\\\categories\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_kanth_Downloads_Devlop_shreebalaji_shreebalaji_src_app_api_admin_categories_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/admin/categories/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmNhdGVnb3JpZXMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmllcyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFkbWluJTJGY2F0ZWdvcmllcyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNrYW50aCU1Q0Rvd25sb2FkcyU1Q0RldmxvcCU1Q3NocmVlYmFsYWppJTVDc2hyZWViYWxhamklNUNzcmMlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2thbnRoJTVDRG93bmxvYWRzJTVDRGV2bG9wJTVDc2hyZWViYWxhamklNUNzaHJlZWJhbGFqaSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDeUQ7QUFDdEk7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaHJlZS1iYWxhamktY2F0ZXJlcnMvPzdmYjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxca2FudGhcXFxcRG93bmxvYWRzXFxcXERldmxvcFxcXFxzaHJlZWJhbGFqaVxcXFxzaHJlZWJhbGFqaVxcXFxzcmNcXFxcYXBwXFxcXGFwaVxcXFxhZG1pblxcXFxjYXRlZ29yaWVzXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZG1pbi9jYXRlZ29yaWVzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vY2F0ZWdvcmllc1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWRtaW4vY2F0ZWdvcmllcy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXFVzZXJzXFxcXGthbnRoXFxcXERvd25sb2Fkc1xcXFxEZXZsb3BcXFxcc2hyZWViYWxhamlcXFxcc2hyZWViYWxhamlcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcY2F0ZWdvcmllc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvYWRtaW4vY2F0ZWdvcmllcy9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./src/app/api/admin/categories/route.ts":
/*!***********************************************!*\
  !*** ./src/app/api/admin/categories/route.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/cache */ \"(rsc)/./node_modules/next/cache.js\");\n/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_cache__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_auth_guards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth-guards */ \"(rsc)/./src/lib/auth-guards.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./src/lib/prisma.ts\");\n\n\n\n\n// GET /api/admin/categories — List all categories (active & inactive)\nasync function GET() {\n    const auth = await (0,_lib_auth_guards__WEBPACK_IMPORTED_MODULE_2__.requireAdminSession)();\n    if (!auth.authorized) return auth.errorResponse;\n    try {\n        const categories = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.portfolioCategory.findMany({\n            orderBy: {\n                displayOrder: \"asc\"\n            },\n            include: {\n                _count: {\n                    select: {\n                        portfolios: true\n                    }\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            categories\n        });\n    } catch (error) {\n        console.error(\"Admin Categories GET Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Failed to fetch categories\"\n        }, {\n            status: 500\n        });\n    }\n}\n// POST /api/admin/categories — Create a new portfolio category\nasync function POST(req) {\n    const auth = await (0,_lib_auth_guards__WEBPACK_IMPORTED_MODULE_2__.requireAdminSession)();\n    if (!auth.authorized) return auth.errorResponse;\n    try {\n        const body = await req.json();\n        const { categoryName, slug, description, icon, bannerImage, displayOrder, active } = body;\n        if (!categoryName) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Category name is required\"\n            }, {\n                status: 400\n            });\n        }\n        const generatedSlug = (slug || categoryName).toLowerCase().trim().replace(/[^a-z0-9\\s-]/g, \"\").replace(/\\s+/g, \"-\");\n        const existing = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.portfolioCategory.findUnique({\n            where: {\n                slug: generatedSlug\n            }\n        });\n        if (existing) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Category slug already exists\"\n            }, {\n                status: 400\n            });\n        }\n        const category = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.portfolioCategory.create({\n            data: {\n                categoryName,\n                slug: generatedSlug,\n                description: description || null,\n                icon: icon || \"\\uD83D\\uDCC1\",\n                bannerImage: bannerImage || null,\n                displayOrder: displayOrder ? parseInt(displayOrder) : 0,\n                active: active !== undefined ? Boolean(active) : true\n            }\n        });\n        (0,next_cache__WEBPACK_IMPORTED_MODULE_1__.revalidatePath)(\"/\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            category\n        }, {\n            status: 201\n        });\n    } catch (error) {\n        console.error(\"Admin Category POST Error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || \"Failed to create category\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9jYXRlZ29yaWVzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMkM7QUFDQztBQUNZO0FBQ2xCO0FBRXRDLHNFQUFzRTtBQUMvRCxlQUFlSTtJQUNwQixNQUFNQyxPQUFPLE1BQU1ILHFFQUFtQkE7SUFDdEMsSUFBSSxDQUFDRyxLQUFLQyxVQUFVLEVBQUUsT0FBT0QsS0FBS0UsYUFBYTtJQUUvQyxJQUFJO1FBQ0YsTUFBTUMsYUFBYSxNQUFNTCwrQ0FBTUEsQ0FBQ00saUJBQWlCLENBQUNDLFFBQVEsQ0FBQztZQUN6REMsU0FBUztnQkFBRUMsY0FBYztZQUFNO1lBQy9CQyxTQUFTO2dCQUNQQyxRQUFRO29CQUNOQyxRQUFRO3dCQUFFQyxZQUFZO29CQUFLO2dCQUM3QjtZQUNGO1FBQ0Y7UUFFQSxPQUFPaEIscURBQVlBLENBQUNpQixJQUFJLENBQUM7WUFBRVQ7UUFBVztJQUN4QyxFQUFFLE9BQU9VLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLCtCQUErQkE7UUFDN0MsT0FBT2xCLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBNkIsR0FBRztZQUFFRSxRQUFRO1FBQUk7SUFDbEY7QUFDRjtBQUVBLCtEQUErRDtBQUN4RCxlQUFlQyxLQUFLQyxHQUFZO0lBQ3JDLE1BQU1qQixPQUFPLE1BQU1ILHFFQUFtQkE7SUFDdEMsSUFBSSxDQUFDRyxLQUFLQyxVQUFVLEVBQUUsT0FBT0QsS0FBS0UsYUFBYTtJQUUvQyxJQUFJO1FBQ0YsTUFBTWdCLE9BQU8sTUFBTUQsSUFBSUwsSUFBSTtRQUMzQixNQUFNLEVBQUVPLFlBQVksRUFBRUMsSUFBSSxFQUFFQyxXQUFXLEVBQUVDLElBQUksRUFBRUMsV0FBVyxFQUFFaEIsWUFBWSxFQUFFaUIsTUFBTSxFQUFFLEdBQUdOO1FBRXJGLElBQUksQ0FBQ0MsY0FBYztZQUNqQixPQUFPeEIscURBQVlBLENBQUNpQixJQUFJLENBQUM7Z0JBQUVDLE9BQU87WUFBNEIsR0FBRztnQkFBRUUsUUFBUTtZQUFJO1FBQ2pGO1FBRUEsTUFBTVUsZ0JBQWdCLENBQUNMLFFBQVFELFlBQVcsRUFDdkNPLFdBQVcsR0FDWEMsSUFBSSxHQUNKQyxPQUFPLENBQUMsaUJBQWlCLElBQ3pCQSxPQUFPLENBQUMsUUFBUTtRQUVuQixNQUFNQyxXQUFXLE1BQU0vQiwrQ0FBTUEsQ0FBQ00saUJBQWlCLENBQUMwQixVQUFVLENBQUM7WUFDekRDLE9BQU87Z0JBQUVYLE1BQU1LO1lBQWM7UUFDL0I7UUFFQSxJQUFJSSxVQUFVO1lBQ1osT0FBT2xDLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQStCLEdBQUc7Z0JBQUVFLFFBQVE7WUFBSTtRQUNwRjtRQUVBLE1BQU1pQixXQUFXLE1BQU1sQywrQ0FBTUEsQ0FBQ00saUJBQWlCLENBQUM2QixNQUFNLENBQUM7WUFDckRDLE1BQU07Z0JBQ0pmO2dCQUNBQyxNQUFNSztnQkFDTkosYUFBYUEsZUFBZTtnQkFDNUJDLE1BQU1BLFFBQVE7Z0JBQ2RDLGFBQWFBLGVBQWU7Z0JBQzVCaEIsY0FBY0EsZUFBZTRCLFNBQVM1QixnQkFBZ0I7Z0JBQ3REaUIsUUFBUUEsV0FBV1ksWUFBWUMsUUFBUWIsVUFBVTtZQUNuRDtRQUNGO1FBRUE1QiwwREFBY0EsQ0FBQztRQUVmLE9BQU9ELHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO1lBQUUwQixTQUFTO1lBQU1OO1FBQVMsR0FBRztZQUFFakIsUUFBUTtRQUFJO0lBQ3RFLEVBQUUsT0FBT0YsT0FBWTtRQUNuQkMsUUFBUUQsS0FBSyxDQUFDLDhCQUE4QkE7UUFDNUMsT0FBT2xCLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO1lBQUVDLE9BQU9BLE1BQU0wQixPQUFPLElBQUk7UUFBNEIsR0FBRztZQUFFeEIsUUFBUTtRQUFJO0lBQ2xHO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zaHJlZS1iYWxhamktY2F0ZXJlcnMvLi9zcmMvYXBwL2FwaS9hZG1pbi9jYXRlZ29yaWVzL3JvdXRlLnRzPzEwZjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5pbXBvcnQgeyByZXF1aXJlQWRtaW5TZXNzaW9uIH0gZnJvbSBcIkAvbGliL2F1dGgtZ3VhcmRzXCI7XG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5cbi8vIEdFVCAvYXBpL2FkbWluL2NhdGVnb3JpZXMg4oCUIExpc3QgYWxsIGNhdGVnb3JpZXMgKGFjdGl2ZSAmIGluYWN0aXZlKVxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVCgpIHtcbiAgY29uc3QgYXV0aCA9IGF3YWl0IHJlcXVpcmVBZG1pblNlc3Npb24oKTtcbiAgaWYgKCFhdXRoLmF1dGhvcml6ZWQpIHJldHVybiBhdXRoLmVycm9yUmVzcG9uc2U7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgcHJpc21hLnBvcnRmb2xpb0NhdGVnb3J5LmZpbmRNYW55KHtcbiAgICAgIG9yZGVyQnk6IHsgZGlzcGxheU9yZGVyOiBcImFzY1wiIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIF9jb3VudDoge1xuICAgICAgICAgIHNlbGVjdDogeyBwb3J0Zm9saW9zOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgY2F0ZWdvcmllcyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiQWRtaW4gQ2F0ZWdvcmllcyBHRVQgRXJyb3I6XCIsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJGYWlsZWQgdG8gZmV0Y2ggY2F0ZWdvcmllc1wiIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuLy8gUE9TVCAvYXBpL2FkbWluL2NhdGVnb3JpZXMg4oCUIENyZWF0ZSBhIG5ldyBwb3J0Zm9saW8gY2F0ZWdvcnlcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICBjb25zdCBhdXRoID0gYXdhaXQgcmVxdWlyZUFkbWluU2Vzc2lvbigpO1xuICBpZiAoIWF1dGguYXV0aG9yaXplZCkgcmV0dXJuIGF1dGguZXJyb3JSZXNwb25zZTtcblxuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuICAgIGNvbnN0IHsgY2F0ZWdvcnlOYW1lLCBzbHVnLCBkZXNjcmlwdGlvbiwgaWNvbiwgYmFubmVySW1hZ2UsIGRpc3BsYXlPcmRlciwgYWN0aXZlIH0gPSBib2R5O1xuXG4gICAgaWYgKCFjYXRlZ29yeU5hbWUpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkNhdGVnb3J5IG5hbWUgaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGdlbmVyYXRlZFNsdWcgPSAoc2x1ZyB8fCBjYXRlZ29yeU5hbWUpXG4gICAgICAudG9Mb3dlckNhc2UoKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnJlcGxhY2UoL1teYS16MC05XFxzLV0vZywgXCJcIilcbiAgICAgIC5yZXBsYWNlKC9cXHMrL2csIFwiLVwiKTtcblxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgcHJpc21hLnBvcnRmb2xpb0NhdGVnb3J5LmZpbmRVbmlxdWUoe1xuICAgICAgd2hlcmU6IHsgc2x1ZzogZ2VuZXJhdGVkU2x1ZyB9LFxuICAgIH0pO1xuXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCJDYXRlZ29yeSBzbHVnIGFscmVhZHkgZXhpc3RzXCIgfSwgeyBzdGF0dXM6IDQwMCB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IHByaXNtYS5wb3J0Zm9saW9DYXRlZ29yeS5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBjYXRlZ29yeU5hbWUsXG4gICAgICAgIHNsdWc6IGdlbmVyYXRlZFNsdWcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBudWxsLFxuICAgICAgICBpY29uOiBpY29uIHx8IFwi8J+TgVwiLFxuICAgICAgICBiYW5uZXJJbWFnZTogYmFubmVySW1hZ2UgfHwgbnVsbCxcbiAgICAgICAgZGlzcGxheU9yZGVyOiBkaXNwbGF5T3JkZXIgPyBwYXJzZUludChkaXNwbGF5T3JkZXIpIDogMCxcbiAgICAgICAgYWN0aXZlOiBhY3RpdmUgIT09IHVuZGVmaW5lZCA/IEJvb2xlYW4oYWN0aXZlKSA6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvXCIpO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSwgY2F0ZWdvcnkgfSwgeyBzdGF0dXM6IDIwMSB9KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJBZG1pbiBDYXRlZ29yeSBQT1NUIEVycm9yOlwiLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gY3JlYXRlIGNhdGVnb3J5XCIgfSwgeyBzdGF0dXM6IDUwMCB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsInJldmFsaWRhdGVQYXRoIiwicmVxdWlyZUFkbWluU2Vzc2lvbiIsInByaXNtYSIsIkdFVCIsImF1dGgiLCJhdXRob3JpemVkIiwiZXJyb3JSZXNwb25zZSIsImNhdGVnb3JpZXMiLCJwb3J0Zm9saW9DYXRlZ29yeSIsImZpbmRNYW55Iiwib3JkZXJCeSIsImRpc3BsYXlPcmRlciIsImluY2x1ZGUiLCJfY291bnQiLCJzZWxlY3QiLCJwb3J0Zm9saW9zIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyIsIlBPU1QiLCJyZXEiLCJib2R5IiwiY2F0ZWdvcnlOYW1lIiwic2x1ZyIsImRlc2NyaXB0aW9uIiwiaWNvbiIsImJhbm5lckltYWdlIiwiYWN0aXZlIiwiZ2VuZXJhdGVkU2x1ZyIsInRvTG93ZXJDYXNlIiwidHJpbSIsInJlcGxhY2UiLCJleGlzdGluZyIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImNhdGVnb3J5IiwiY3JlYXRlIiwiZGF0YSIsInBhcnNlSW50IiwidW5kZWZpbmVkIiwiQm9vbGVhbiIsInN1Y2Nlc3MiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/categories/route.ts\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fadmin%2Fcategories%2Froute&page=%2Fapi%2Fadmin%2Fcategories%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Fcategories%2Froute.ts&appDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ckanth%5CDownloads%5CDevlop%5Cshreebalaji%5Cshreebalaji&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();