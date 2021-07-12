export const transformArrayLikeToArray = (arr) => {
  if (!arr.length) {
    return arr;
  }
  return Array.from(arr);
}

export const getPageForms = () => {
  return transformArrayLikeToArray(document.forms);
}

export const getPageLinks = () => {
  return transformArrayLikeToArray(document.links);
}

export const getPageImages = () => transformArrayLikeToArray(document.images);

export const getLength = (arr) => arr?.length;

export const getChildElementsLength = (ele) => getLength(ele.querySelectorAll('*'));

export const getElementsByTagName = (nodeName) => document.getElementsByTagName(nodeName);

export const getPageElementsUrl = (arr) => arr.map((ele) => ele.src || ele.href);

export const getPageLinksUrl = () => getPageElementsUrl(getPageLinks());

export const getPageImagesUrl = () => getPageElementsUrl(getPageImages());

export const getBodyElementsLength = () => getChildElementsLength(document.body);

export const getHeadElementsLength = () => getChildElementsLength(document.head);

export const getPageElementsLength = () => getChildElementsLength(document);

export const openAllImages = () => getPageImagesUrl().map((url) => window.open(url));

export const openAllLinks = () => getPageLinksUrl().map((url) => window.open(url));

export const getPageImagesInfo = () => {
  let images = {};
  getPageImages().map((img) => {
    images[img.alt] = img.src;
  })
  return images;
}

export const getPageLinksInfo = () => {
  let links = {};
  getPageLinks().forEach((link) => {
    links[link.innerText] = link.href;
  });
  return links;
}

export const getPageNodeInfo = (...nodeNames) => {
  let pageInfo = {
    'total nodes': getPageElementsLength(),
    'body nodes': getBodyElementsLength(),
    'head nodes': getHeadElementsLength(),
    'divs': getLength(getElementsByTagName('div')),
    'spans': getLength(getElementsByTagName('span')),
    'forms': getLength(getPageForms()),
    'images': getLength(getPageImages()),
    'links': getLength(getPageLinks()),
  };
  if (Array.isArray(nodeNames)) {
    nodeNames.forEach((nodeName) => {
      pageInfo[nodeName] = getLength(getElementsByTagName(nodeName));
    });
  }
  return pageInfo;
}

export const print = console.table

export const printPageNodeInfo = (...nodeNames) => {
  print(getPageNodeInfo(...nodeNames));
}

export const printImagesInfo = () => {
  print(getPageImagesInfo());
}

export const printLinksInfo = () => {
  print(getPageLinksInfo());
}
