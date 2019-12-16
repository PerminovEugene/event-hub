"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var graphql_1 = require("@nestjs/graphql");
var gql_login_guard_1 = require("../auth/gql.login.guard");
var common_1 = require("@nestjs/common");
// import { CurrentUser } from '../auth/user.decorator';
var user_decorator_1 = require("./user.decorator");
var shared_1 = require("@calendar/shared");
var gql_guard_1 = require("./gql.guard");
var AuthResolver = /** @class */ (function () {
    function AuthResolver(authService) {
        this.authService = authService;
    }
    AuthResolver.prototype.registration = function (registrationInput) {
        return __awaiter(this, void 0, void 0, function () {
            var saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.error('qweqw');
                        return [4 /*yield*/, this.authService.registration(registrationInput)];
                    case 1:
                        saved = _a.sent();
                        // ctx.req.session.userId = saved.id;
                        return [2 /*return*/, saved];
                }
            });
        });
    };
    AuthResolver.prototype.login = function (email, password, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(email, password);
                // const saved = await this.authService.login(loginInput);
                // ctx.req.session.userId = saved.id;
                return [2 /*return*/, ctx.req.user];
            });
        });
    };
    // @Query('login')
    // @UseGuards(GqlLoginGuard)
    // async login(
    //   @Args('email')
    //   email: string,
    //   @Args('password')
    //   password: string,
    //   @Context() ctx: any,
    // ): Promise<any> {
    //   console.error('qweqw1');
    //   // const user = await this.authService.login({ email, password });
    //   // ctx.req.session.userId = 1; //user.id;
    //   // return user;
    //   // debugger;
    //   // ctx.req.req.logIn(user, { session: true });
    //   return ctx.req.user;
    // }
    // @Query(returns => SessionData)
    // @UseGuards(GqlAuthGuard)
    // whoAmI(@CurrentUser() user: any) {
    //   debugger;
    //   console.log(user);
    //   return user;
    // }
    // @Mutation(() => [ErrorResponse], { nullable: true })
    // async signup(
    //   @Args('signupInput') signupInput: SignupInput,
    // ): Promise<ErrorResponse[] | null> {
    //   return this.userService.signup(signupInput);
    // }
    // @Mutation(() => [ErrorResponse], { nullable: true })
    // async login(
    //   @Args('loginInput') loginInput: LoginInput,
    //   @Context() ctx: MyContext,
    // ): Promise<ErrorResponse[] | null> {
    //   return this.userService.login(loginInput, ctx.req);
    // }
    // @Mutation(() => Boolean)
    // async logout(@Context() ctx: MyContext) {
    //   return this.userService.logout(ctx);
    // }
    AuthResolver.prototype.whoAmI = function (user) {
        return user;
    };
    __decorate([
        common_1.UseGuards(gql_login_guard_1.GqlLoginGuard),
        graphql_1.Mutation(),
        __param(0, graphql_1.Args('user'))
    ], AuthResolver.prototype, "registration");
    __decorate([
        common_1.UseGuards(gql_login_guard_1.GqlLoginGuard),
        graphql_1.Mutation('login'),
        __param(0, graphql_1.Args('email')),
        __param(1, graphql_1.Args('password')),
        __param(2, graphql_1.Context())
    ], AuthResolver.prototype, "login");
    __decorate([
        graphql_1.Query(function (returns) { return shared_1.SessionData; }),
        common_1.UseGuards(gql_guard_1.GqlAuthenticatedGuard),
        __param(0, user_decorator_1.CurrentUser())
    ], AuthResolver.prototype, "whoAmI");
    AuthResolver = __decorate([
        graphql_1.Resolver('Auth')
    ], AuthResolver);
    return AuthResolver;
}());
exports.AuthResolver = AuthResolver;
