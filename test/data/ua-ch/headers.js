const UACHTests = [
    {
        desc: 'Avast Secure Browser',
        headers : {
            'sec-ch-ua': '"Avast Secure Browser";v="131", "Chromium";v="131", "Not_A Brand";v="24"'
        },
        expect: {
            browser : {
                name : 'Avast Secure Browser',
                version : '131',
                major : '131',
                type : undefined
            }
        }
    },
    {
        desc: 'AVG Secure Browser',
        headers : {
            'sec-ch-ua': '"AVG Secure Browser";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
        },
        expect: {
            browser : {
                name : 'AVG Secure Browser',
                version : '123',
                major : '123',
                type : undefined
            }
        }
    },
    {
        desc: 'Avira Secure Browser',
        headers : {
            'sec-ch-ua': '"Chromium";v="124", "Avira Secure Browser";v="124", "Not-A.Brand";v="99"'
        },
        expect: {
            browser : {
                name : 'Avira Secure Browser',
                version : '124',
                major : '124',
                type : undefined
            }
        }
    },
    {
        desc: 'Brave',
        headers : {
            'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Brave";v="132"'
        },
        expect: {
            browser : {
                name : 'Brave',
                version : '132',
                major : '132',
                type : undefined
            }
        }
    },
    {
        desc: 'Chrome',
        headers : {
            'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"'
        },
        expect: {
            browser : {
                name : 'Chrome',
                version : '111',
                major : '111',
                type : undefined
            }
        }
    },
    {
        desc: 'Chrome Headless',
        headers : {
            'sec-ch-ua': '"Chromium";v="124", "HeadlessChrome";v="124", "Not-A.Brand";v="99"'
        },
        expect: {
            browser : {
                name : 'Chrome Headless',
                version : '124',
                major : '124',
                type : undefined
            }
        }
    },
    {
        desc: 'Chrome WebView',
        headers : {
            'sec-ch-ua': '"Android WebView";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
        },
        expect: {
            browser : {
                name : 'Chrome WebView',
                version : '123',
                major : '123',
                type : undefined
            }
        }
    },
    {
        desc: 'DuckDuckGo',
        headers : {
            'sec-ch-ua': '"DuckDuckGo";v="131", "Chromium";v="131", "Not_A Brand";v="24"'
        },
        expect : {
            browser : {
                name : 'DuckDuckGo',
                version : '131',
                major : '131',
                type : undefined
            }
        }
    },
    {
        desc: 'Edge',
        headers : {
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"'
        },
        expect: {
            browser : {
                name : 'Edge',
                version : '120',
                major : '120',
                type : undefined
            }
        }
    },
    {
        desc: 'Edge WebView2',
        headers : {
            'sec-ch-ua': '" Not;A Brand";v="99", "Microsoft Edge";v="103", "Chromium";v="103", "Microsoft Edge WebView2";v="104"'
        },
        expect: {
            browser : {
                name : 'Edge WebView2',
                version : '104',
                major : '104',
                type : undefined
            }
        }
    },
    {
        desc: 'Huawei Browser',
        headers : {
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "HuaweiBrowser";v="114"'
        },
        expect: {
            browser : {
                name : 'Huawei Browser',
                version : '114',
                major : '114',
                type : undefined
            }
        }
    },
    {
        desc: 'Lighthouse',
        headers : {
            'sec-ch-ua': '"Chromium";v="119", "Google Chrome";v="119", "Lighthouse";v="11.5.0"'
        },
        expect: {
            browser : {
                name : 'Lighthouse',
                version : '11.5.0',
                major : '11',
                type : undefined
            }
        }
    },
    {
        desc: 'MIUI Browser',
        headers : {
            'sec-ch-ua': '"Miui Browser";v="123", "Not:A-Brand";v="8", "Chromium";v="123"'
        },
        expect: {
            browser : {
                name : 'MIUI Browser',
                version : '123',
                major : '123',
                type : undefined
            }
        }
    },
    {
        desc: 'Norton Private Browser',
        headers : {
            'sec-ch-ua': '"Chromium";v="124", "Norton Private Browser";v="124", "Not-A.Brand";v="99"'
        },
        expect: {
            browser : {
                name : 'Norton Private Browser',
                version : '124',
                major : '124',
                type : undefined
            }
        }
    },
    {
        desc: 'Oculus Browser',
        headers : {
            'sec-ch-ua': '"Chromium";v="130", "Oculus Browser";v="36", "Not?A_Brand";v="99"'
        },
        expect: {
            browser : {
                name : 'Oculus Browser',
                version : '36',
                major : '36',
                type : undefined
            }
        }
    },
    {
        desc: 'Opera',
        headers : {
            'sec-ch-ua': '"Opera";v="116", "Chromium";v="131", "Not_A Brand";v="24"'
        },
        expect: {
            browser : {
                name : 'Opera',
                version : '116',
                major : '116',
                type : undefined
            }
        }
    },
    {
        desc: 'Opera GX',
        headers : {
            'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Opera GX";v="114"'
        },
        expect: {
            browser : {
                name : 'Opera GX',
                version : '114',
                major : '114',
                type : undefined
            }
        }
    },
    {
        desc: 'Opera Mobi',
        headers : {
            'sec-ch-ua': '"OperaMobile";v="86", ";Not A Brand";v="99", "Opera";v="115", "Chromium";v="130"'
        },
        expect: {
            browser : {
                name : 'Opera Mobi',
                version : '86',
                major : '86',
                type : undefined
            }
        }
    },
    {
        desc: 'Opera Mobi',
        headers : {
            'sec-ch-ua': '"Chromium";v="132", "OperaMobile";v="87", "Opera";v="117", " Not A;Brand";v="99"'
        },
        expect: {
            browser : {
                name : 'Opera Mobi',
                version : '87',
                major : '87',
                type : undefined
            }
        }
    },
    {
        desc: 'Samsung Internet',
        headers : {
            'sec-ch-ua': '"Chromium";v="125", "Not.A/Brand";v="24", "Samsung Internet";v="27.0"'
        },
        expect: {
            browser : {
                name : 'Samsung Internet',
                version : '27.0',
                major : '27',
                type : undefined
            }
        }
    },
    {
        desc: 'Yandex',
        headers : {
            'sec-ch-ua': '"Chromium";v="130", "YaBrowser";v="24.12", "Not?A_Brand";v="99", "Yowser";v="2.5"'
        },
        expect: {
            browser : {
                name : 'Yandex',
                version : '24.12',
                major : '24',
                type : undefined
            }
        }
    }
];

module.exports = UACHTests;