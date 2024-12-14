import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

interface FeaturesProps {
  id?: string;
  style?: React.CSSProperties;
}

const Features: React.FC<FeaturesProps> = ({ id, style }) => {
  return (
    <>
      <section id={id} style={style} className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph="Our E-voting system offers a range of features to ensure secure, transparent, and fair elections"
            center
          />

          <div className="grid grid-cols-4 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;