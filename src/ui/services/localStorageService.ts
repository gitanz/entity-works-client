type ProjectPath = string;

export interface AppSettings {
    projectPath: ProjectPath
}

export function updateProjectPath(value: ProjectPath) {
    let appSettings: AppSettings = JSON.parse(localStorage.getItem('appSettings') ?? '{}') as AppSettings;
    console.log(value)
    appSettings = {
        ...appSettings,
        projectPath: value
    } 

    localStorage.setItem('appSettings', JSON.stringify(appSettings));
}
