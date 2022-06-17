let date = new Date();


class DateSimplified {
    constructor() {
        this.hour = date.getHours();
        this.minutes = date.getMinutes();
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();
    }

    reset() {

        this.hour = date.getHours();
        this.minutes = date.getMinutes();
        this.day = date.getDate();
        this.month = date.getMonth();
        this.year = date.getFullYear();

    }

     getCurrentString() {
    //ziua                      //notarea incepe de la 1
    var curentDate = date.getHours() + '/' + date.getMinutes() + '/' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    return curentDate;
    }

     loadDateFromString(stringDate){
        var stringSplit = stringDate.split('/');
        this.hour = stringSplit[0]
        this.minutes = stringSplit[1];
        this.day = stringSplit[2]
        this.month = stringSplit[3]
        this.year = stringSplit[4]
    }

}


module.exports.DateSimplified=DateSimplified