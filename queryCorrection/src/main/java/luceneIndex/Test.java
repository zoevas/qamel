package luceneIndex;

import java.util.HashSet;

public class Test {
	public static void main(String[] args){
		Index I = new Index();
		String query = "Univversity of Lipzig";
		HashSet<String> res = I.search(query);
		System.out.println("Searched : " + query);
		System.out.println("Found: ");
		for(String r: res){
			System.out.println(r);
		}
	}
}
