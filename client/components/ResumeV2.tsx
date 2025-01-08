import { Phone, Mail, MousePointer, Music, LinkedinIcon, House, Square, Gamepad2 } from "lucide-react";
import { FC } from "react";
import { FaGithub } from "react-icons/fa";

type props = {
  // resume display data
  border: boolean,
  name: string,
  tagline: string,
  rightColumn: rightColumnItem[],
  leftColumnSections: leftColumnSection[],
  summary: string,
  contacts: contact[],
  education: string,
  skills: skillList[],
  references: reference[],
  // functions
  showPopup: (popupName: string) => void,
  setFocusedRightItem: (index: number) => void,
  setRightColumn: (newColumn: rightColumnItem[]) => void,
  setFocusedSkill: (index: number) => void,
};

const Resume : FC<props> = (props) => {
  const showPopup = props.showPopup;
  
  const processMdSubset = (text : string) => {
    const processLink = (text : string) => {
      let jsx : (JSX.Element | string)[] = [];
      const linkRegex = /\[.+?\]\(.+?\)/;
      let match = text.match(linkRegex);
      while (match) {
        const link = match[0];
        jsx.push(text.substring(0, match.index));
        jsx.push(
          <a href={link.split(/[\(\)]/)[1]} className="underline">
            {link.substring(1, link.indexOf("]"))}
          </a>
        );
        text = text.substring((match.index || 0) + link.length);
        match = text.match(linkRegex);
      }
      jsx.push(text);
      return jsx;
    }

    return text.split("\n").map((piece) => {
      return <p className="min-h-2">
        {
          piece.split("**").map((piece, index) => {
            if (index % 2 == 0) {
              return processLink(piece);
            } else {
              return <span className="font-bold">{processLink(piece)}</span>
            }
          })
        }
      </p>
    })
  }
  
  const generateSummarySection = () => {
    return (
      <button onClick={() => showPopup("summary")} className="text-left">
        <h5 className="mb-2 text font-grotesk font-medium uppercase
        tracking-ultra">
          Summary
        </h5>
        { props.summary != "" &&
          <div className="text-mini text-justify leading-tight pr-4">
            { processMdSubset(props.summary) }
          </div>
        }
      </button>
    );
  }
  
  const generateContactLine = () => {
    const getTextForContact = (contact : contact) => {
      if (contact.link) {
        return (
          <a className="underline" href={contact.link} key={contact.name}>
            { contact.value }
          </a>
        );
      } else {
        return <span key={contact.name}>{contact.value}</span>
      }
    }

    return <p className="text-11px text-center">
      { props.contacts.filter(c => c.shown).map((contact, index, arr) => {
        return <>
          <span className="mx-1">
            { getTextForContact(contact) }
          </span>{index == arr.length - 1 ? '' : '|'}
        </>
      })}
    </p>
  }

  const generateEducationSection = () => {
    return (
      <button onClick={() => showPopup("education")}
      className="mt-4 text-left w-full">
        <h5 className="font-grotesk font-medium uppercase tracking-extra-wider">
          Education
        </h5>
        <div className="bg-stone-700 h-[1px] mb-[2px] w-auto"/>
        { props.education != "" &&
          <div className="w-fit grid text-11px leading-tight">
            { props.education.split("\n").map((line, index) => {
              if (index % 2 == 0)
              {
                return <p className="col-start-1 mr-6">
                  {processMdSubset(line)}
                </p>
              }
              else
              {
                return <p className="col-start-2">
                  {processMdSubset(line)}
                </p>
              }
            })}
          </div>
        }
      </button>
    );
  }

  const generateSkillsSection = () => {
    const createListString = (list : skillList) => {
      let s = list.items.filter(i => i.shown).map(i => i.text).join(', ');
      return s
    }

    const onClick = (index : number) => {
      props.setFocusedSkill(index);
      showPopup("skills");
    }

    return <>
      <h5 className="mt-4 text font-grotesk font-medium uppercase
      tracking-ultra">
        Skills
      </h5>
      <div className="bg-stone-700 h-[1px] mb-[2px] w-auto"/>
      <div className="w-fit grid grid-fit-columns text-11px leading-tight">
        { props.skills.map((list, index) => {
          if (list.shown) {
            return <>
              <button className="block text-left col-start-1 mr-8"
              onClick={ () => onClick(index) }>
                <p className="font-bold h-full">{list.name}</p>
              </button>
              <button className="block w-full text-left col-start-2"
              onClick={ () => onClick(index) }>
                <p>{createListString(list)}</p>
              </button>
            </>;
          }
        }) }
      </div>
    </>
  }

  const generateHeadingJSX = 
  (heading : heading, index : number) => {

    const onHeadingChange = (value : string) => {
      let newColumn = props.rightColumn.slice();
      (newColumn[index] as heading).text = value;
      props.setRightColumn(newColumn);
    }

    return <>
      <input
        className="w-full font-16px tracking-extra-wider uppercase 
        font-medium"
        value={heading.text}
        onChange={(e) => onHeadingChange(e.target.value)}
      />
      <div className="bg-stone-700 h-[1px] mb-[2px] w-auto"/>
    </>;
  }

  const generateExperienceJSX = 
  (experience : experience, index : number) => {

    const onClick = () => {
      props.setFocusedRightItem(index);
      showPopup("experience");
    }

    return (
      <button
        key={`right-col-${index}`}
        className={"block mb-4 last:mb-0 w-full"}
        onClick={ onClick }
      >
        <div className="text-left leading-tight">
          <div className="flex flex-row justify-between items-end">
            <h5 className="flex-grow font-semibold text-11.5px max-w-96">
              { processMdSubset(experience.title) }
            </h5>
            <span className="text-right text-11px">
              { experience.dates }
            </span>
          </div>
          <p className="relative -top-0.5 w-full text-11px">
            { processMdSubset(experience.subtitle) }
          </p>
          <ul className="-mt-0.25 ml-4 text-11px list-disc text-justify">
            {experience.bullets.map((bullet, j) => {
              if (bullet.shown) {
                return (
                  <li key={`bullet-${index}-${j}`}>
                    {processMdSubset(bullet.text)}
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </button>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className={"w-[7.5in] h-[11in] px-[0.75in] py-[0.33in] border-black "
        + (props.border ? 'border' : '')}>
        <button className="w-full" onClick={() => showPopup("header")}>
          <h1 className="-mb-2 text-28px text-center font-medium uppercase
          tracking-extra-wider">
            { props.name ? 
              props.name 
            : 
              <span className="font-light italic text-stone-400">
                No Name
              </span>
            }
          </h1>
        </button>
        { props.leftColumnSections.some(s => s.name == "Contact" && s.shown) ?
          generateContactLine()
        :
          <></>
        }
        <p className="mt-2 text-center text-11px">
          <span className="font-bold">Portfolio: </span>
          <span className="underline">http://testportfolio.com</span>
        </p>
        <div>
          {props.rightColumn.map((item, index) => {
            if (item.isHeading) {
              return generateHeadingJSX(item as heading, index)
            } else if (item.shown) {
              return generateExperienceJSX(item as experience, index);
            }
          })}
        </div>
        { props.leftColumnSections.some(s => s.name == "Education" && s.shown) ?
          generateEducationSection()
        :
          <></>
        }
        { props.leftColumnSections.some(s => s.name == "Skills" && s.shown) ?
          generateSkillsSection()
        :
          <></>
        }
      </div>
    </div>
  );
}

export default Resume;