//
//  wjyTestManager.m
//  demoApp
//
//  Created by 梁方峥 on 2018/4/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "wjyTestManager.h"
#import <React/RCTUIManager.h>
@implementation wjyTestManager
RCT_EXPORT_MODULE();
int i = 0;
RCT_EXPORT_METHOD(doSomething:(NSString *)aString withA:(nonnull NSNumber  *)a)
{
  dispatch_sync(dispatch_get_main_queue(), ^{
    NSLog(@"%@,%d",aString,i++);
   UIImageView *View = (UIImageView*) [self.bridge.uiManager viewForReactTag:a];
    NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:aString]];
    View.image = [UIImage imageWithData:data];
  });
}

@end
