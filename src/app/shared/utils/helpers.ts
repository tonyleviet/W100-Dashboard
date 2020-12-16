import { each } from 'lodash';

declare const document;

export class Helpers {
  static insertAtCursor(controlEl: any, value: string) {
    //IE support
    if (document.selection) {
      controlEl.focus();
      const sel = document.selection.createRange();
      sel.text = value;
    }
    //MOZILLA and others
    else if (controlEl.selectionStart || controlEl.selectionStart == "0") {
      var startPos = controlEl.selectionStart;
      var endPos = controlEl.selectionEnd;
      controlEl.value =
        controlEl.value.substring(0, startPos) +
        value +
        controlEl.value.substring(endPos, controlEl.value.length);
    } else {
      controlEl.value += value;
		}
		
		return controlEl.value;
  }

  static formatNumber(number: number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  static messageReplacement(obj: any, tokenMessage: string) {
    return new Function('const {' + Object.keys(obj).join(',') + '} = this.obj;return `' + tokenMessage + '`').call({obj});
  }

  static flat2tree(array: any) {
    const keys = {}, rootChildren = [];

    each(array, (item) => {
      keys[item.Id] = item;
    });

    each(array, (item: any) => {
      if (!item.ParentId) {
        rootChildren.push(item);
      } else {
        if (!keys[item.ParentId].children) {
          keys[item.ParentId].children = [];
        }
        keys[item.ParentId].children.push(item);
      }
    });
    return rootChildren;
  }

  static tree2flat(children, flatArray?: any[], parentName: string = '') {
    if (!flatArray) {
      flatArray = [];
    }
    each(children, (item: any) => {
      flatArray.push(item);
      item.ParentName = parentName;
      if (!item.children) {
        return;
      }
      const pName = `${parentName}${item.Name}&nbsp;>>&nbsp;`;
      this.tree2flat(item.children, flatArray, pName);
    });

    return flatArray;
  }

  static findAllChildren(array: any[], children?: any, flatArray?: any[]) {
    if (!flatArray) {
      flatArray = [];
    }
    if (!children) {
      return;
    }

    each(array, (item: any) => {
      if (item.ParentId === children.Id) {
        flatArray.push(item);
        this.findAllChildren(array, item, flatArray);
      }
    });
    return flatArray;
  }
}
