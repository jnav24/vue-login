class GlobalService {
    /**
     * Similar to Php array_column, returns an array of values from multidimensional array
     *
     * @param {string} val
     * @param {any[]} arr
     * @returns {any[]}
     */
    public arrayColumn(val: string, arr: object[]): any[] {
        return arr.map((obj: any) => {
            if (typeof (obj as any)[val] !== 'undefined') {
                return (obj as any)[val];
            }
        });
    }

    public getMonths() {
        return [
            { value: 1, month_int: '01' },
            { value: 2, month_int: '02' },
            { value: 3, month_int: '03' },
            { value: 4, month_int: '04' },
            { value: 5, month_int: '05' },
            { value: 6, month_int: '06' },
            { value: 7, month_int: '07' },
            { value: 8, month_int: '08' },
            { value: 9, month_int: '09' },
            { value: 10, month_int: '10' },
            { value: 11, month_int: '11' },
            { value: 12, month_int: '12' },
        ];
    }

    public getStatesArray(): string[] {
        return [
            'Alabama', 'Alaska', 'American Samoa', 'Arizona',
            'Arkansas', 'California', 'Colorado', 'Connecticut',
            'Delaware', 'District of Columbia', 'Federated States of Micronesia',
            'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
            'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
            'Missouri', 'Montana', 'Nebraska', 'Nevada',
            'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
            'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
            'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
            'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
            'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ];
    }

    public getStatesObject(): Array<{ name: string; abbreviation: string }>  {
        return [
            {
                name: 'Alabama',
                abbreviation: 'AL',
            },
            {
                name: 'Alaska',
                abbreviation: 'AK',
            },
            {
                name: 'American Samoa',
                abbreviation: 'AS',
            },
            {
                name: 'Arizona',
                abbreviation: 'AZ',
            },
            {
                name: 'Arkansas',
                abbreviation: 'AR',
            },
            {
                name: 'California',
                abbreviation: 'CA',
            },
            {
                name: 'Colorado',
                abbreviation: 'CO',
            },
            {
                name: 'Connecticut',
                abbreviation: 'CT',
            },
            {
                name: 'Delaware',
                abbreviation: 'DE',
            },
            {
                name: 'District Of Columbia',
                abbreviation: 'DC',
            },
            {
                name: 'Federated States Of Micronesia',
                abbreviation: 'FM',
            },
            {
                name: 'Florida',
                abbreviation: 'FL',
            },
            {
                name: 'Georgia',
                abbreviation: 'GA',
            },
            {
                name: 'Guam',
                abbreviation: 'GU',
            },
            {
                name: 'Hawaii',
                abbreviation: 'HI',
            },
            {
                name: 'Idaho',
                abbreviation: 'ID',
            },
            {
                name: 'Illinois',
                abbreviation: 'IL',
            },
            {
                name: 'Indiana',
                abbreviation: 'IN',
            },
            {
                name: 'Iowa',
                abbreviation: 'IA',
            },
            {
                name: 'Kansas',
                abbreviation: 'KS',
            },
            {
                name: 'Kentucky',
                abbreviation: 'KY',
            },
            {
                name: 'Louisiana',
                abbreviation: 'LA',
            },
            {
                name: 'Maine',
                abbreviation: 'ME',
            },
            {
                name: 'Marshall Islands',
                abbreviation: 'MH',
            },
            {
                name: 'Maryland',
                abbreviation: 'MD',
            },
            {
                name: 'Massachusetts',
                abbreviation: 'MA',
            },
            {
                name: 'Michigan',
                abbreviation: 'MI',
            },
            {
                name: 'Minnesota',
                abbreviation: 'MN',
            },
            {
                name: 'Mississippi',
                abbreviation: 'MS',
            },
            {
                name: 'Missouri',
                abbreviation: 'MO',
            },
            {
                name: 'Montana',
                abbreviation: 'MT',
            },
            {
                name: 'Nebraska',
                abbreviation: 'NE',
            },
            {
                name: 'Nevada',
                abbreviation: 'NV',
            },
            {
                name: 'New Hampshire',
                abbreviation: 'NH',
            },
            {
                name: 'New Jersey',
                abbreviation: 'NJ',
            },
            {
                name: 'New Mexico',
                abbreviation: 'NM',
            },
            {
                name: 'New York',
                abbreviation: 'NY',
            },
            {
                name: 'North Carolina',
                abbreviation: 'NC',
            },
            {
                name: 'North Dakota',
                abbreviation: 'ND',
            },
            {
                name: 'Northern Mariana Islands',
                abbreviation: 'MP',
            },
            {
                name: 'Ohio',
                abbreviation: 'OH',
            },
            {
                name: 'Oklahoma',
                abbreviation: 'OK',
            },
            {
                name: 'Oregon',
                abbreviation: 'OR',
            },
            {
                name: 'Palau',
                abbreviation: 'PW',
            },
            {
                name: 'Pennsylvania',
                abbreviation: 'PA',
            },
            {
                name: 'Puerto Rico',
                abbreviation: 'PR',
            },
            {
                name: 'Rhode Island',
                abbreviation: 'RI',
            },
            {
                name: 'South Carolina',
                abbreviation: 'SC',
            },
            {
                name: 'South Dakota',
                abbreviation: 'SD',
            },
            {
                name: 'Tennessee',
                abbreviation: 'TN',
            },
            {
                name: 'Texas',
                abbreviation: 'TX',
            },
            {
                name: 'Utah',
                abbreviation: 'UT',
            },
            {
                name: 'Vermont',
                abbreviation: 'VT',
            },
            {
                name: 'Virgin Islands',
                abbreviation: 'VI',
            },
            {
                name: 'Virginia',
                abbreviation: 'VA',
            },
            {
                name: 'Washington',
                abbreviation: 'WA',
            },
            {
                name: 'West Virginia',
                abbreviation: 'WV',
            },
            {
                name: 'Wisconsin',
                abbreviation: 'WI',
            },
            {
                name: 'Wyoming',
                abbreviation: 'WY',
            },
        ];
    }
}

export default GlobalService;
