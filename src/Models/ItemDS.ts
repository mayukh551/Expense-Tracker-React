class itemDS {
    id: string;
    title: string;
    amount: string;
    date: string;

    constructor(id: string, title: string, amount: string, date: string) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.date = date;
    }
}

export default itemDS;
