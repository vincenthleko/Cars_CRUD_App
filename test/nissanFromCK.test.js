import assert from "assert";
import { nissansFromCK } from "../nissansFromCK.js";

describe('The nissansFromCK function', function() {
    it('should return "Nissan car from CK" when there is a Nissan with a CK registration number', function() {
        const cars = [
            { make: 'Nissan', reg_number: 'CK1234' },
            { make: 'Toyota', reg_number: 'CA5678' }
        ];
        assert.equal('Nissan car from "CK"', nissansFromCK(cars));
    });

    it('should return "car not nissan and not from CK" when there are no Nissan cars with a CK registration number', function() {
        const cars = [
            { make: 'Ford', reg_number: 'CA5678' },
            { make: 'Toyota', reg_number: 'CA1234' }
        ];
        assert.equal('car not nissan and not from "CK"', nissansFromCK(cars));
    });
});

