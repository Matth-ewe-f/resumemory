type resume = {
  id: string,
  sizing?: sizing,
  name: string,
  headerName: string,
  tagline: string,
  rightColumn: rightColumnItem[],
  leftColumnSections: leftColumnSection[],
  summary: string,
  contacts: contact[],
  education: string,
  skillLists: skillList[],
  references: reference[],
  dateSaved: string,
}

type sizing = {
  nameFontSize: number,
  headerMargin: number,
  headingFontSize: number,
  bodyTextFontSize: number,
  marginHorz: number,
  marginVert: number,
}

type sizingStrings = {
  nameFontSize: string,
  headerMargin: string,
  headingFontSize: string,
  bodyTextFontSize: string,
  marginHorz: string,
  marginVert: string,
}

type experience = {
  id: string,
  title: string,
  dates: string,
  subtitle: string,
  bullets: bullet[],
  shown?: boolean,
  oldVer?: experience,
}

type bullet = {
  id: string,
  text: string,
  shown?: boolean,
}

type heading = {
  text: string,
  shown?: boolean,
}

type rightColumnItem = (experience | heading) & { isHeading?: boolean };

type leftColumnSection = {
  name: string,
  shown?: boolean,
}

type leftColumnItem = {
  name: string,
  shown?: boolean,
}

type contact = {
  name: string,
  value: string,
  link?: string,
  shown?: boolean,
}

type skillList = {
  name: string,
  items: skillItem[],
  shown?: boolean,
  oldVer?: skillList,
}

type skillItem = {
  id: string,
  text: string,
  shown?: boolean,
}

type reference = {
  name: string,
  subtitle: string,
  contact1: referenceContact,
  contact2: referenceContact,
  shown?: boolean,
}

type referenceContact = {
  text: string,
  icon: string,
}