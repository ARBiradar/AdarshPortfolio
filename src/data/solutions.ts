export interface SolutionFile {
  name: string;
  path: string;
  language: string;
  code: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  stats: {
    timeComplexity: string;
    spaceComplexity: string;
    leetcodeUrl?: string;
  };
}

export const SOLUTIONS: SolutionFile[] = [
  {
    name: "Anagram.java",
    path: "solutions/Anagram.java",
    language: "java",
    difficulty: "Easy",
    stats: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(k) where k is alphabet size (256)",
      leetcodeUrl: "https://leetcode.com/problems/valid-anagram/"
    },
    description: "Determines if two strings are anagrams of each other by checking if they contain the same characters with the same frequencies using a hash map.",
    code: `import java.util.HashMap;

class Anagram{
    public static HashMap<Character, Integer> makeFreqMap(String str){
        HashMap<Character, Integer> mp = new HashMap<>();
        int n=str.length();
        for (int i = 0; i < n; i++) {
            Character ch = str.charAt(i);
            if(!mp.containsKey(ch)){
                mp.put(ch,1);

            }else{
                int currFreq= mp.get(ch);
                mp.put(ch, currFreq+1);
            }
        }
        return mp;
        
    }
    static boolean isAnagram(String s1, String s2){
       HashMap<Character, Integer> mp1 = makeFreqMap(s1);
       HashMap<Character, Integer> mp2 = makeFreqMap(s2);
       return mp1.equals(mp2);

    }
    public static void main(String[] args) {
        boolean b = isAnagram("know","known");
        if(b){
            System.out.println("Anagram");
        }else System.out.println("not Anagram");
        
        
    }
}`
  },
  {
    name: "IsomorphicString.java",
    path: "solutions/IsomorphicString.java",
    language: "java",
    difficulty: "Easy",
    stats: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(k) where k is character set size",
      leetcodeUrl: "https://leetcode.com/problems/isomorphic-strings/"
    },
    description: "Validates if two strings are isomorphic by ensuring a one-to-one character mapping using a HashMap and a HashSet to track mapped values.",
    code: `import java.util.HashMap;
import java.util.HashSet;

public class IsomorphicString {
    //isomorphic String mean a if we have two strings which are mapping each other where each unique character mapping an uinique another character
    // for example abcd -> pqrs, where a->p, b->q,c->r, d->s, like that aabcddc -> ppqrssq
    // use hash map to store the unique element with thair unique value
    static boolean isIsomorphic(String s, String t){
        HashMap <Character, Character> mp = new HashMap<>();
        HashSet<Character> hs = new HashSet<>();
        if(s.length() != t.length()) return false;
        for (int i = 0; i < s.length(); i++) {
            Character sch = s.charAt(i);
            Character tch = t.charAt(i);
            if(mp.containsKey(sch)){
                if(mp.get(sch)!=tch){
                    return false;
                }
            }else if(hs.contains(tch)){
                    return false;
                } else {
                    mp.put(sch,tch);
                    hs.add(tch);
                }

            }
            
        
        return true;
    }    
    public static void main(String[] args) {
        boolean b = isIsomorphic("aabbcc","xxyzdd");
        if(b){
            System.out.println("Isomprhic");
        }
        else{
            System.out.println("Not Isomorphic");
        }
    }
}`
  },
  {
    name: "TwoSum.java",
    path: "solutions/TwoSum.java",
    language: "java",
    difficulty: "Easy",
    stats: {
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/"
    },
    description: "Finds two indices in a sorted array that sum to a target value. Uses a two-pointer approach, yielding O(1) space but requires sorting.",
    code: `import java.util.Arrays;

public class TwoSum {
    static int[] twoSum(int[] arr, int target){
        Arrays.sort(arr);
        int n = arr.length;
        int[] ans = new int[2];
        int left =0; int right = n-1;
        while(left<right){
            int sum = arr[left] + arr[right];
            if(target == sum){
                ans[0] = left+1;
                ans[1] = right + 1;
                return ans;
            } else if(sum < target){
                left++;

            } else {
                right--;
            }
        }
        return ans;
    }
    public static void main(String[] args) {
        int[] arr = {1,1,2,3,4,5};
        int[] anw = new int[2];
        anw = twoSum(arr, 5);
        System.out.println(Arrays.toString(anw));
        
    }
}`
  },
  {
    name: "TwoSumHashMap.java",
    path: "solutions/TwoSumHashMap.java",
    language: "java",
    difficulty: "Easy",
    stats: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/"
    },
    description: "Optimized O(n) time complexity Two Sum solution. Uses a HashMap to store values and their indices, finding the target partner in a single pass.",
    code: `import java.util.Arrays;
import java.util.HashMap;

public class TwoSumHashMap {
     static int[] twoSum(int[] arr, int target){
        int n = arr.length;
        int[] ans = {-1,-1};
        HashMap <Integer,Integer>  mp = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            int partner = target - arr[i];
            if(mp.containsKey(partner)){
                ans = new int[]{i+1,mp.get(partner) + 1};
                return ans;
            }
            mp.put(arr[i],i);
            
        }
        return ans;
     }
     
       public static void main(String[] args) {
        int[] arr = {1,1,2,3,4,5};
        int[] anw = new int[2];
        anw = twoSum(arr, 5);
        System.out.println(Arrays.toString(anw));
     }
    
}`
  }
];
