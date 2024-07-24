interface IInterredTypeBase {
}
interface IInferredType extends IInterredTypeBase {
    myProperty;
}

interface IGenericForInferredType<T extends IInterredTypeBase> {
}

type ICallback<TInferredType extends IInterredTypeBase, TGenericForInferredType extends IGenericForInferredType<TInferredType>> = (instance: TInferredType) => any;

function register<
    TInferredType extends IInterredTypeBase,
    TGenericForInferredType extends IGenericForInferredType<TInferredType>
>(
    param1: new () => TGenericForInferredType,
    callback: ICallback<TInferredType, TGenericForInferredType>
) {
    //...
}

class ClassImplementingGenericForInferredType implements IGenericForInferredType<IInferredType> {
}

register(ClassImplementingGenericForInferredType, (instance) => {
    // Property `instance` should be of type `IInferredType` but is of `IInterredTypeBase`.
    // TypeScript should infer its type as `IInferredType`, thus `myProperty` should be accessible here.
    // TypeScript should infer its type as `IInferredType`, becase `ClassImplementingGenericForInferredType` is `IGenericForInferredType<IInferredType>`
    instance.myProperty = "...";
})