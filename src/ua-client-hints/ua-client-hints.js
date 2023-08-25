//////////////////////////////////////////////
/*  A collection of utility methods for 
    working with user-agent client hints
    https://github.com/faisalman/ua-parser-js
    Author: Faisal Salman <f@faisalman.com>
    MIT License */
/////////////////////////////////////////////

/*jshint esversion: 11 */ 

const fieldType = Object.freeze({
    Boolean : 'sf-boolean',
    List    : 'sf-list',
    String  : 'sf-string'
});

const uaCHMap = Object.freeze({
    architecture : {
        field    : 'Sec-CH-UA-Arch', 
        type    : fieldType.String
    },
    bitness : {
        field    : 'Sec-CH-UA-Bitness', 
        type    : fieldType.String
    },
    brands : {
        field    : 'Sec-CH-UA', 
        type    : fieldType.List
    },
    formFactor : {
        field    : 'Sec-CH-UA-Form-Factor', 
        type    : fieldType.String
    },
    fullVersionList : {
        field    : 'Sec-CH-UA-Full-Version-List', 
        type    : fieldType.List
    },
    mobile : {
        field    : 'Sec-CH-UA-Mobile', 
        type    : fieldType.Boolean
    },
    model : {
        field    : 'Sec-CH-UA-Model', 
        type    : fieldType.String
    },
    platform : {
        field    : 'Sec-CH-UA-Platform',
        type    : fieldType.String
    }, 
    platformVersion : {
        field    : 'Sec-CH-UA-Platform-Version', 
        type    : fieldType.String
    },
    wow64 : {
        field    : 'Sec-CH-UA-WOW64',
        type    : fieldType.Boolean
    }
});

class UAClientHints {

    #uach = new Map();

    constructor () {
        for (const key in uaCHMap) {
            this.#uach.set(key, null);
        }
        return this;
    };

    #parseHeader (str, type) {
        if (!str) {
            return null;
        }
        switch (type) {
            case fieldType.Boolean:
                return /\?1/.test(str);
            case fieldType.List:
                return str.replace(/\\?\"/g, '')
                    .split(',')
                    .map(brands => {
                        const [brand, version] = brands.trim().split(';v=');
                        return { 
                            brand : brand, 
                            version : version
                        };
                });
            case fieldType.String:
                return str.replace(/\s*\\?\"\s*/g, '');
            default:
                return '';
        }
    };

    #serialize(data, type) {
        throw new Error('Not implemented yet');
        //return '';
    }

    getSerializedUAData() {
        throw new Error('Not implemented yet');
        //let http = {};
        //return http;
    }

    getUAData(props) {
        if (props) {
            return Object.fromEntries(props.filter(val => this.#uach.get(val)).map(val => [val, this.#uach.get(val)]));
        }
        return Object.fromEntries(this.#uach);
    }

    setUAData(uaDataValues) {
        if(Object.keys(uaDataValues).some(key => key.startsWith('sec-ch-ua'))) {
            for (const val in uaCHMap) {
                const { field, type } = uaCHMap[val];
                this.#uach.set(val, this.#parseHeader(uaDataValues[field.toLowerCase()], type));
            }
        } else {
            for (const value in uaDataValues) {
                if (this.#uach.has(value)) this.#uach.set(value, uaDataValues[value]);
            }
        }
        return this;
    };
}

module.exports = {
    UAClientHints
};