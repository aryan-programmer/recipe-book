function sleep (ms: number): Promise<void> {
	return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export default sleep;
export {sleep};
