import { BuilderOutput, createBuilder, BuilderContext } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';

interface Options extends JsonObject {
  command: string;
  args: string[];
}

export default createBuilder<Options>(
  async (builderConfig: Options, context: BuilderContext): Promise<BuilderOutput> => {
    context.logger.info('build is starting');
    context.logger.info(builderConfig.command);
    const build = await context.scheduleTarget({
      target: 'build',
      project: context.target?.project || '',
      configuration: 'production'
    });

    const result = await build.result;

    if (result.success) {
      return {
        success: true
      }
    }

    return {
      success: false,
      error: ''
    }
  });

