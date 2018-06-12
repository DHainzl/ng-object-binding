import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnChanges,
  AfterViewChecked,
  AfterContentChecked,
  OnDestroy,
  Input
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export interface Item {
  test: string;
}

export class SubComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() item;

  @Input() changed: Subject<any>;

  sub: Subscription = new Subscription();

  constructor(private name: string, protected cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const sub = this.changed.subscribe(() => this.cdr.markForCheck());
    this.sub.add(sub);
  }

  ngOnChanges() {
    console.log(`${this.name} changed`);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

@Component({
  selector: 'app-sub1',
  template: `
        Test: {{ item.test }}
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sub1Component extends SubComponent {
  item;

  constructor(protected cdr: ChangeDetectorRef) {
    super('sub1', cdr);
  }
}

@Component({
  selector: 'app-sub2',
  template: `
        Test: {{ item.test }}<br />
        <button (click)="change()">Change Value inside sub</button>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sub2Component extends SubComponent {
  item;

  constructor(protected cdr: ChangeDetectorRef) {
    super('sub2', cdr);
  }

  change() {
    this.item.test = 'baz';
    this.changed.next();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item: Item = {
    test: 'foo'
  };
  changed: Subject<any> = new Subject();

  constructor(private cdr: ChangeDetectorRef) {}

  doSomething() {
    this.item.test = 'bar';
    this.changed.next();
  }
}
