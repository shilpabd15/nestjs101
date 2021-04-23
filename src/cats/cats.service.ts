import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Cat } from "./interfaces/cat.interface";
import { CreateCatDto } from "./dto/create-cat.dto";

@Injectable()
export class CatsServices {
    constructor(@InjectModel('Cats') private readonly cats: Model<Cat>) { }


    async create(cat: CreateCatDto) {
        const createCat = new this.cats(cat);
        await createCat.save();

    };

    async findAll() {
        return await this.cats.find();
    }

    async findOne(id: any) {
        const cats = await this.cats.findOne({ _id: id });
        return cats
    }

    async deleteOne(id: any) {
        //  this.cats =this.cats.filter(cat=> cat.name!== name);
        await this.cats.deleteOne({ _id: id });

    }


    async updateOne(id: any, cat: CreateCatDto) {
        // let index=this.cats.findIndex(cat=> cat.name== name);
        // this.cats[index].age=cat.age;
        // this.cats[index].breed=cat.breed;
        // return this.cats[index];
        await this.cats.updateOne({ _id: id }, { name: cat.name, age: cat.age, breed: cat.breed });
        return this.cats.findOne({ name: cat.name })
    };




    "http://34.126.106.182:3000/cats/gen"
}