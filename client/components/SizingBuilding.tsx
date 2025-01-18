import { ChevronDown, ChevronUp } from "lucide-react";

type props = {
  open : boolean,
  setOpen : (b : boolean) => void,
  sizing : sizingStrings,
  updateSizing : (s : sizingStrings) => void,
}

const SizingBuilder = ({open, setOpen, sizing, updateSizing} : props) => {

  const updateNameSize = (newSize : string) => {
    let newSizing = structuredClone(sizing);
    newSizing.nameFontSize = newSize;
    updateSizing(newSizing);
  }

  const updateHeadingSize = (newSize : string) => {
    let newSizing = structuredClone(sizing);
    newSizing.headingFontSize = newSize;
    updateSizing(newSizing);
  }
  
  const updateBodyTextSize = (newSize : string) => {
    let newSizing = structuredClone(sizing);
    newSizing.bodyTextFontSize = newSize;
    updateSizing(newSizing);
  }
  
  const updateMarginHorz = (newSize : string) => {
    let newSizing = structuredClone(sizing);
    newSizing.marginHorz = newSize;
    updateSizing(newSizing);
  }
  
  const updateMarginVert = (newSize : string) => {
    let newSizing = structuredClone(sizing);
    newSizing.marginVert = newSize;
    updateSizing(newSizing);
  }

  return (
    <div className="min-w-60 pl-8 pr-6 py-4 bg-stone-300
    rounded-2xl shadow-lg">
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold font-grotesk uppercase
        tracking-ultra">
          Sizing
        </h3>
        <button onClick={ () => setOpen(!open)}>
          { open ? <ChevronDown size={24}/> : <ChevronUp size={24}/> }
        </button>
      </div>
      <div className={"overflow-y-hidden transition-all duration-300 " +
      (open ? 'max-h-48' : 'max-h-0')}>
        <div className="flex my-1 justify-between">
            <p>Name Font Size:</p>
            <input
              type="number"
              className="px-0.5 w-16"
              value={sizing.nameFontSize}
              onChange={(e) => updateNameSize(e.target.value)}
            />
        </div>
        <div className="flex my-1 justify-between">
            <p>Heading Font Size:</p>
            <input
              type="number"
              className="px-0.5 w-16"
              value={sizing.headingFontSize}
              onChange={(e) => updateHeadingSize(e.target.value)}
            />
        </div>
        <div className="flex my-1 justify-between">
            <p>Body Text Font Size:</p>
            <input
              type="number"
              className="px-0.5 w-16"
              value={sizing.bodyTextFontSize}
              onChange={(e) => updateBodyTextSize(e.target.value)}
            />
        </div>
        <div className="flex my-1 justify-between">
            <p>Margin Horizontal:</p>
            <input
              type="number"
              className="px-0.5 w-16"
              value={sizing.marginHorz}
              onChange={(e) => updateMarginHorz(e.target.value)}
            />
        </div>
        <div className="flex my-1 justify-between">
            <p>Margin Vertical:</p>
            <input
              type="number"
              className="px-0.5 w-16"
              value={sizing.marginVert}
              onChange={(e) => updateMarginVert(e.target.value)}
            />
        </div>
      </div>
    </div>
  );
}

export default SizingBuilder;