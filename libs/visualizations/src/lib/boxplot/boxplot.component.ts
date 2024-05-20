import {
  BoxplotProps,
  BoxplotVisualization,
  CategoryBoxplotSummary,
  CategoryPoint,
} from '@angular-monorepo/sage-visualizations';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'lib-boxplot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boxplot.component.html',
  styleUrl: './boxplot.component.css',
})
export class BoxplotComponent implements OnChanges, OnInit, OnDestroy {
  @ViewChild('someId', { static: true }) someId: ElementRef | undefined;
  boxplot: BoxplotVisualization | undefined;

  @Input() points: CategoryPoint[] = [];
  @Input() summaries: CategoryBoxplotSummary[] | undefined;
  @Input() title = '';
  @Input() xAxisTitle = '';
  @Input() yAxisTitle = '';
  @Input() yAxisMin: number | undefined;
  @Input() yAxisMax: number | undefined;
  @Input() xAxisCategoryToTooltipText: Record<string, string> | undefined;
  @Input() pointTooltipFormatter: undefined | ((pt: CategoryPoint) => string);

  ngOnInit(): void {
    const domElement = this.someId?.nativeElement as HTMLDivElement;
    if (domElement) {
      this.boxplot = new BoxplotVisualization(
        domElement,
        this.getBoxplotProps()
      );
    }
  }

  ngOnChanges(): void {
    this.boxplot?.setOptions(this.getBoxplotProps());
  }

  ngOnDestroy() {
    this.boxplot?.destroy();
  }

  private getBoxplotProps(): BoxplotProps {
    return {
      points: this.points,
      summaries: this.summaries,
      title: this.title,
      xAxisTitle: this.xAxisTitle,
      yAxisTitle: this.yAxisTitle,
      yAxisMin: this.yAxisMin,
      yAxisMax: this.yAxisMax,
      xAxisCategoryToTooltipText: this.xAxisCategoryToTooltipText,
      pointTooltipFormatter: this.pointTooltipFormatter,
    };
  }
}
