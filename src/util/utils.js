import moment from "moment-timezone";

export function utcTimeProcess(datetime) {
    moment.tz.setDefault("Asia/Shanghai");
    let time = moment(datetime).tz("Asia/Shanghai").format()
    const currentDate = new Date(time);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}
export function compareDateTime(starttime_, endtime_) {
    let starttime = utcTimeProcess(starttime_);
    let endtime = utcTimeProcess(endtime_);
    let nowtime = utcTimeProcess(new Date());
    if (nowtime < starttime) {
        return -1;
    } else if (nowtime >= starttime && nowtime <= endtime) {
        return 0;
    } else {
        return 1;
    }
}