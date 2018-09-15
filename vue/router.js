"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Router = (function () {
    function Router() {
        this.routes = {};
        this.currentUrl = '';
        this.history = [];
        this.currentIndex = this.history.length - 1;
        this.refresh = this.refresh.bind(this);
        this.backOff = this.backOff.bind(this);
        this.isBack = false;
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }
    Router.prototype.route = function (path, callback) {
        this.routes[path] = callback || function () { };
    };
    Router.prototype.refresh = function () {
        this.currentUrl = location.hash.slice(1) || '/';
        if (!this.isBack) {
            if (this.currentIndex < this.history.length - 1) {
                this.history = this.history.slice(0, this.currentIndex + 1);
                this.history.push(this.currentUrl);
                this.currentIndex++;
            }
        }
        this.routes[this.currentUrl]();
        this.isBack = false;
    };
    Router.prototype.backOff = function () {
        this.isBack = true;
        this.currentIndex <= 0 ? this.currentIndex = 0 : this.currentIndex--;
        location.hash = "#" + this.history[this.currentIndex];
        this.routes[this.history[this.currentIndex]]();
    };
    return Router;
}());
exports.default = Router;
//# sourceMappingURL=router.js.map