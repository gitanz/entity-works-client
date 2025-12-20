const fs = require('fs').promises;
const path = require('path');

class LocalFsWorkspaceRepository {
    async workspaceExists(workspacePath) {
        try {
            await fs.access(workspacePath);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = LocalFsWorkspaceRepository;
