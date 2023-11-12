'use strict'

export default (() => {
    return {
        todoForProjectId(projectId) {
            if (!projectId || projectId === "allprojects")
                return () => true;

            return t => t.getProjectId() === projectId;
        },

        displayDate(date) {
            return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
        }
    }
})();