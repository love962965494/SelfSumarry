;
(function (exports) {
    var toastContainer = document.querySelector('.toast__container');
    var toast = function (msg, options) {
        if (!msg) {
            return;
        }
        options = options || 3000;
        var toastMsg = document.createElement('div');
        toastMsg.className = 'toast__msg';
        toastMsg.textContent = msg;
        toastContainer.appendChild(toastMsg);
        setTimeout(function () {
            toastMsg.classList.add('toast__msg--hide');
        }, options);
        toastMsg.addEventListener('transitionend', function (ev) {
            ev.target.parentNode.removeChild(ev.target);
        });
    };
    exports.toast = toast;
})(typeof window === 'undefined' ? module.exports : window);
//# sourceMappingURL=toast.js.map