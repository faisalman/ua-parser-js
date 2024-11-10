import { expectType } from 'tsd';
import { UAParser, IResult, IBrowser, ICPU, IEngine, IDevice, IOS } from "../src/main/ua-parser";
import { isAppleSilicon, isChromeFamily } from "../src/helpers/ua-parser-helpers";

const uastring = 'Mozilla/5.0 (X11; MyCustomOS; Linux i686; rv:19.0) Gecko/20100101 Firefox/19.0';
const extensions = {
    os : [
        [/(mycustomos)/], [UAParser.OS.NAME, [UAParser.OS.VERSION, '10']]
    ]
};
const headers = {
    'sec-ch-ua-mobile' : '?1'
};

expectType<IResult>(UAParser());
expectType<IResult>(UAParser(uastring));
expectType<IResult>(UAParser(uastring, extensions));
expectType<IResult>(UAParser(uastring, headers));
expectType<IResult>(UAParser(extensions, headers));
expectType<IResult>(UAParser(extensions));
expectType<IResult>(UAParser(headers));
expectType<UAParser>(new UAParser());

const parser = new UAParser(uastring);
const browser = parser.getBrowser();

expectType<IBrowser>(browser);
expectType<string | undefined>(browser.name);
expectType<string | undefined>(browser.version);
expectType<string | undefined>(browser.major);
expectType<'crawler' | 'cli' | 'email' | 'fetcher' | 'inapp' | 'mediaplayer' | 'library' | undefined>(browser.type);
expectType<boolean>(browser.is(''));
expectType<string>(browser.toString());
expectType<IBrowser | PromiseLike<IBrowser>>(browser.withClientHints());
expectType<IBrowser | PromiseLike<IBrowser>>((<IBrowser>browser.withClientHints()).withFeatureCheck());
expectType<boolean>((<IBrowser>(<IBrowser>browser.withClientHints()).withFeatureCheck()).is(''));

expectType<ICPU>(parser.getCPU());
expectType<IDevice>(parser.getDevice());
expectType<IEngine>(parser.getEngine());
expectType<IOS>(parser.getOS());
expectType<IResult>(parser.getResult());
expectType<string>(parser.getUA());
expectType<UAParser>(parser.setUA(uastring));

const result = parser.getResult();

expectType<boolean>(isAppleSilicon(result));
expectType<boolean>(isChromeFamily(result));