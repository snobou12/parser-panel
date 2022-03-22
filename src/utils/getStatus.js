export function getStatus(status){
    switch(status){
        case "working" :
            return "green";
        case "warning": // ?
            return "red"
        case "stopped":
            return "orange"
        default:
            return "red"
    }
}