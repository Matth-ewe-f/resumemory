import { X } from "lucide-react";
import { FC, useState } from "react";

type props = {
  oldName: string,
  oldTagline: string,
  onClose: () => void,
  onOverwrite: (name : string, tagline: string) => void,
  onChange: (name : string, tagline: string) => void,
};

const HeaderPopup : FC<props> = (props) => {
  const [name, setName] = useState(props.oldName);
  const [tagline, setTagline] = useState(props.oldTagline);

  const nameChanged = (s : string) => {
    setName(s);
    props.onChange(s, tagline);
  }

  const taglineChanged = (s : string) => {
    setTagline(s);
    props.onChange(name, s);
  }

  // This is actually a much bigger can of worms than you realized
  // Revert to what, if edited then edited again? Default?
  // Revert to what on a saved resume? Saved? or Default?
  const onRevert = () => {
    setName(props.oldName);
    setTagline(props.oldTagline);
    props.onChange(props.oldName, props.oldTagline);
  }

  const isAnythingChanged = () => {
    return name != props.oldName || tagline != props.oldTagline;
  }

  return (
    <div className="w-[480px] px-6 py-4 bg-stone-300 rounded-2xl shadow-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-xl font-grotesk uppercase tracking-ultra">
          Edit Header
        </h3>
        <button onClick={ props.onClose }>
          <X size={32} className="hover:text-stone-400"/>
        </button>
      </div>
      <hr className="mb-3 border-t border-stone-700"/>
      <div className="w-full flex flex-col gap-y-2">
        <input 
          value={name}
          onChange={e => nameChanged(e.target.value)}
          placeholder="Name"
        />
        <input
          value={tagline}
          onChange={e => taglineChanged(e.target.value)}
          placeholder="Tagline"
        />
      </div>
      <div className="mt-2 flex justify-center">
        { isAnythingChanged() ?
          <>
            <button 
              className="px-3 py-1.5 mr-4 rounded-md text-stone-200
            bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
              onClick={() => props.onOverwrite(name, tagline) }
            >
              Overwrite Default
            </button>
            <button 
              className="px-3 py-1.5 mr-4 rounded-md text-stone-200
            bg-stone-800 hover:bg-stone-600 disabled:bg-stone-600"
              onClick={onRevert}
            >
              Revert Changes
            </button>
          </>
        :
          <p className="py-1.5">No Changes</p>
        }
      </div>
    </div>
  );
}

export default HeaderPopup;