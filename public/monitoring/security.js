// Security and obfuscation layer
(function() {
    'use strict';
    
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);
    
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode == 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode == 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode == 85)) { // Ctrl+U
            e.preventDefault();
            return false;
        }
    }, false);
    
    // Detect DevTools
    const devtools = { isOpen: false };
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            if (!devtools.isOpen) {
                devtools.isOpen = true;
                // Optionally redirect or show warning
                console.clear();
            }
        } else {
            devtools.isOpen = false;
        }
    }, 500);
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
    }, 2000);
    
    // Override console methods
    const noop = function() {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'profile', 'profileEnd', 'clear'];
    
    for (let i = 0; i < methods.length; i++) {
        console[methods[i]] = noop;
    }
    
})();
