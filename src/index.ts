import Test from './test';
import {cloneDeep} from 'lodash';

interface Person {
    fName: string;
    lName: string;
}


function greeter(person: Person) {
    return "Test, " + person;
}

function lesser(test: Test){
    console.log(cloneDeep(test).name);
}

const user = {fName: 'john', lName: 'esf'};

document.body.innerHTML = greeter(user);