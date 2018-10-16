;
(function () {
    var header = document.querySelector('header');
    var menuHeader = document.querySelector('.menu__header');
    document.addEventListener('DOMContentLoaded', function () {
        if (!navigator.onLine) {
            updateNetworkStatus();
        }
        window.addEventListener('online', updateNetworkStatus, false);
        window.addEventListener('offline', updateNetworkStatus, false);
    });
    var updateNetworkStatus = function () {
        if (navigator.onLine) {
            header.classList.remove('app__offline');
            menuHeader.style.background = '#1e88e5';
        }
        else {
            toast('You are now offline..');
            header.classList.add('app__offline');
            menuHeader.style.background = '#9e9e9e';
        }
    };
})();
//# sourceMappingURL=offline.js.map