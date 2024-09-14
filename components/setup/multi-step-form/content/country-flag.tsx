import ReactCountryFlag from "react-country-flag";

interface CountryFlagProps {
    countryCode: string;
    countryTitle: string;
}
const CountryFlag = ({countryCode, countryTitle} : CountryFlagProps) => {
    return ( 
        <ReactCountryFlag
            className="rounded-full"
            countryCode={countryCode}
            svg
            title={countryTitle}
        /> 
    );
}
 
export default CountryFlag;