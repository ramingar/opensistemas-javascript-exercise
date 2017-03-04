/**
 * Created by rafael on 03/03/17.
 */

// Debounce function is based on Underscore.js' debounce function.
// Try to run a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = {
    timeout: null,
    run (func, wait, immediate) {
        const context = this, args = arguments;
        const later = function () {
            this.timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !this.timeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
};

const utils = {
    debounce
};

export default utils;
