import { FC } from "react";

type props = {
  // resume display data
  border: boolean,
  sizing: sizing,
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
  // layout constants with default values
  const sizing = props.sizing;
  const nameFont = sizing ? sizing.nameFontSize : 32;
  const headerMargin = sizing ? sizing.headerMargin : 0.15;
  const headingFont = sizing ? sizing.headingFontSize : 17;
  const bodyTextFont = sizing ? sizing.bodyTextFontSize : 11.5;
  const marginHorz = sizing ? sizing.marginHorz : 0.6;
  const marginVert = sizing ? sizing.marginVert : 0.3;
  const itemHeadingFont = bodyTextFont + 0.5;

  // functions
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

    return text.split("\n").map((piece, index) => {
      return <p className="min-h-2" key={index}>
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


    return (
      <p className="text-center" 
      style={{ fontSize: itemHeadingFont + "px" }}>
        { props.contacts.filter(
            c => c.shown && c.name.split(" ")[0].toLowerCase() != "portfolio"
          ).map((contact, index, arr) => {
          return <>
            <span className="mx-1">
              { getTextForContact(contact) }
            </span>{index == arr.length - 1 ? '' : '|'}
          </>
        })}
      </p>
    )
  }

  const generateEducationSection = () => {
    return (
      <button onClick={() => showPopup("education")}
      className="mt-4 text-left w-full">
        <h5 className="font-grotesk font-medium uppercase tracking-extra-wider"
        style={{ fontSize: headingFont + "px" }}>
          Education
        </h5>
        <div className="bg-stone-700 h-[1px] mb-[2px] w-auto"/>
        { props.education != "" &&
          <div className="w-fit grid leading-tight"
          style={{ fontSize: bodyTextFont + "px" }}>
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
      <h5 className="mt-4 font-grotesk font-medium uppercase tracking-ultra"
      style={{ fontSize: headingFont + "px" }}>
        Skills
      </h5>
      <div className="bg-stone-700 h-[1px] mb-[2px] w-auto"/>
      <div className="w-fit grid grid-fit-col1 leading-tight"
      style={{ fontSize: bodyTextFont + "px" }}>
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
        className="w-full tracking-extra-wider uppercase font-medium"
        style={{ fontSize: headingFont + "px" }}
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
            <h5 className="flex-grow font-semibold max-w-96"
            style={{ fontSize: itemHeadingFont + "px" }}>
              { processMdSubset(experience.title) }
            </h5>
            <span className="text-right"
            style={{ fontSize: bodyTextFont + "px"}}>
              { experience.dates }
            </span>
          </div>
          <p className="relative -top-[1px] w-full"
          style={{ fontSize: bodyTextFont + "px" }}>
            { processMdSubset(experience.subtitle) }
          </p>
          <ul 
            className="-mt-[2px] ml-4 text-11px list-disc text-justify"
            style={{fontSize: bodyTextFont + "px"}}
          >
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
      <div className={"w-[8.5in] h-[11in] border-black "
        + (props.border ? 'border' : '')}
        style={{ padding: marginVert + "in " + marginHorz + "in" }}
        >
        <button className="w-full" onClick={() => showPopup("header")}>
          <h1
            className="-mb-2 text-center font-medium uppercase
            tracking-extra-wider"
            style={{ fontSize: nameFont + "px" }}
          >
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
          <>
            { generateContactLine() }
            { props.contacts.filter(
              s => s.name.split(" ")[0].toLowerCase() == "portfolio" && s.shown
            ).map(contact => {
              return (
                <p className="mt-2 text-center"
                style={{ fontSize: itemHeadingFont + "px" }}>
                  <span className="font-bold">Portfolio: </span>
                  <a className="underline" href={contact.link}>
                    {contact.link}
                  </a>
                </p>
              );
            }) }
          </>
        :
          <></>
        }
        <div style={{ marginTop: (headerMargin + "in") }}>
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