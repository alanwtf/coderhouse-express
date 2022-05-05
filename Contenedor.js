const fs = require("fs");

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async save(obj) {
        let arr = await this.getAll();
        if (arr.length > 0) obj.id = arr[arr.length - 1].id + 1;
        else obj.id = 1;
        arr.push(obj);
        await this.saveFile(arr);
        return obj.id;
    }

    async getById(id) {
        const arr = await this.getAll();
        return arr.find((obj) => obj.id === id) || null;
    }

    async getAll() {
        let arr;
        try {
            const file = await fs.promises.readFile(`./${this.fileName}`, "utf-8");
            if (!file) arr = [];
            else arr = JSON.parse(file);
        } catch (err) {
            console.error(err);
        }
        return arr;
    }

    async getRandom() {
        const arr = await this.getAll();
        let randomProduct = Math.floor(Math.random() * arr.length) + 1;
        return await arr[randomProduct - 1];
    }

    async saveFile(newArr) {
        await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(newArr, null, 2));
    }

    async deleteById(id) {
        const arr = await this.getAll();
        const newArr = arr.filter((el) => el.id !== id);
        await this.saveFile(newArr);
    }

    async deleteAll() {
        const arr = [];
        await this.saveFile(arr);
    }
}

module.exports = Contenedor;
