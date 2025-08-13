import { Component, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../shared/api/api.service';
import * as CodeMirror from 'codemirror';
import * as glob from '../menu/example';
import { Configuration } from '../config/config.model';
import { ConfigService } from '../config/config.service';
import { CodeMirrorDirective } from '../../shared/code-mirror/code-mirror.directive';
import { EditorType } from '../../shared/code-mirror/code-mirror.model';
import { environment } from 'src/environments/environment';

@Component ({
  selector: 'app-runner',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.css'],
  providers: [ ApiService ]
})

export class RunnerComponent {
  constructor(private apiService: ApiService, private configService: ConfigService) {
    this.config = configService.config;
  }


  EditorType = EditorType;
  @ViewChildren(CodeMirrorDirective) codeEditors: QueryList<CodeMirrorDirective>;
  error = '';
  running = false;

  oValue: string;
  private config: Configuration;

  output = 'Error formatting CQL code';
  getInputEditor() {
    return this.codeEditors.find((mirror) => mirror.type === EditorType.input);
  }

  run() {
    this.clear();
    if (!this.running) {
      this.running = true;
      const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
      this.config.value = input.value;
      this.apiService.post(this.config)
        .forEach(responses => {
          this.processResponses(responses);
          this.running = false;
        })
        .catch(error => {
          this.error = error;
          this.running = false;
          this.oValue += '>> Engine Service call failed: ' + error + '\n';
          this.updateOutput();
        });
    }
  }

  processResponses(responses: any) {
    this.oValue += '\n';

    if (responses && responses.parameter) {
      for (const e of responses.parameter) {
        const name = e.name;
        const value = this.parseResponseValue(e);
        this.oValue += '>> ' + name + ': ' + value + '\n';
      }
    }

    this.updateOutput();
  }

  private parseResponseValue(responseItem: any): string {
    // Type 1: Direct value properties (valueBoolean, valueString, etc.)
    const directValueKeys = Object.keys(responseItem).filter(k => k.startsWith('value') && !k.startsWith('_value'));
    if (directValueKeys.length > 0) {
      const valueKey = directValueKeys[0];
      const value = responseItem[valueKey];
      return this.formatValue(value);
    }

    // Type 2: Extension-based responses (_valueBoolean with extensions)
    if (responseItem._valueBoolean?.extension) {
      const extension = responseItem._valueBoolean.extension[0];
      
      // Handle data-absent-reason extension
      if (extension.url.includes('data-absent-reason')) {
        return 'null';
      }
      
      // Handle cqf-isEmptyList extension
      if (extension.url.includes('cqf-isEmptyList') && extension.valueBoolean === true) {
        return '[]';
      }
    }

    // Type 3: Part-based complex objects (Tuples)
    if (responseItem.part) {
      return this.formatTuple(responseItem.part);
    }

    // Type 4: Resource objects
    if (responseItem.resource) {
      return this.formatResource(responseItem.resource);
    }

    // Fallback
    return 'undefined';
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined) {
      return 'null';
    }
    
    // Handle FHIR resources with concise display
    if (value.resourceType && value.id) {
      return `${value.resourceType}(id=${value.id})`;
    }
    
    // Handle arrays of resources
    if (Array.isArray(value) && value.length > 0 && value[0].resourceType) {
      const resourceRefs = value.map(r => `${r.resourceType}(id=${r.id})`).join(', ');
      return `[${resourceRefs}]`;
    }
    
    // Handle primitive values
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return JSON.stringify(value);
    }
    
    // Handle other objects (periods, etc.)
    return JSON.stringify(value, null, 2);
  }

  private formatTuple(parts: any[]): string {
    const tupleData: any = {};
    for (const part of parts) {
      if (part.name && part.valueCoding) {
        tupleData[part.name] = part.valueCoding.display || part.valueCoding.code;
      } else if (part.name && part.valueString) {
        tupleData[part.name] = part.valueString;
      }
    }
    return `Tuple { ${Object.entries(tupleData).map(([k, v]) => `${k}: "${v}"`).join(', ')} }`;
  }

  private formatResource(resource: any): string {
    if (resource.resourceType && resource.id) {
      return `${resource.resourceType}(id=${resource.id})`;
    }
    return JSON.stringify(resource, null, 2);
  }

  displayOutput() {
    const input = this.codeEditors.find((mirror) => mirror.type === EditorType.input);
    input.value = this.output;
  }

  setConfig(config: Configuration) {
    this.config = config;
  }

  clear() {
    this.oValue = '';
    const output = this.codeEditors.find((mirror) => mirror.type === EditorType.output);
    output.value = '';
  }

  private updateOutput() {
    const output = this.codeEditors.find((mirror) => mirror.type === EditorType.output);
    output.value = this.oValue;
  }

  getExample() {
    // const rand = Math.floor(Math.random() * glob.examples.length);
    return glob.examples[1].cql;
  }
}
